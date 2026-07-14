import projectmodel from "../models/ProjectModel.js";
import ExpereinceModel from "../models/Expereince.js";
import techModel from "../models/TechStack.js";
import skillmodel from "../models/skills.js";
import contactModel from "../models/Contact.js";
import { broadcastUpdate } from "./socket.js";
import { healProjectImages } from "./imageheal.js";

// In-memory cache: one entry per collection, served from RAM instead of
// hitting MongoDB on every request. Loaded on server start (warmCache) and
// re-synced by the write controllers whenever data is added/edited/deleted.

const models = {
  project: projectmodel,
  work: ExpereinceModel,
  tech: techModel,
  skill: skillmodel,
  contact: contactModel,
};

const loaders = {
  project: () => projectmodel.find({}).lean(),
  work: () => ExpereinceModel.find({}).lean(),
  tech: () => techModel.find({}).lean(),
  skill: () => skillmodel.find({}).lean(),
  contact: () => contactModel.find({}).lean(),
};

const store = {};

// Re-read one collection from MongoDB into RAM. Called after every write,
// so it also pushes the fresh data to connected socket clients — cache
// reloads (warm-up, misses) pass broadcast: false.
const refreshCache = async (key, { broadcast = true } = {}) => {
  store[key] = await loaders[key]();
  if (broadcast) broadcastUpdate(key, store[key]);
  if (key === "project") {
    // Fire-and-forget: migrate any bare-filename image (written by old code)
    // to ImageKit. The resulting DB write re-enters via the change stream.
    healProjectImages(store[key]).catch((err) =>
      console.error("Image healing failed:", err?.message || err)
    );
  }
  return store[key];
};

// Serve from RAM; only falls back to MongoDB if the key was never loaded
// (e.g. a request arrived before the warm-up finished or warm-up failed).
const getCached = async (key) => {
  if (store[key]) return store[key];
  return refreshCache(key, { broadcast: false });
};

// Watch MongoDB change streams so writes made by ANY backend instance
// (e.g. the deployed server on EC2 while this one runs locally, or the
// other way round) refresh this instance's cache and reach socket clients.
// Without this, the RAM cache only updates on writes that go through THIS
// process, and other instances' changes stay invisible until a restart.
// Requires a replica set (Atlas always is one); on a standalone MongoDB the
// watch call fails and we simply keep the write-through behaviour.
const watchCollections = () => {
  Object.entries(models).forEach(([key, model]) => {
    try {
      const stream = model.watch();
      let timer = null;
      stream.on("change", () => {
        // Debounce bursts (multi-document writes) into a single refresh
        clearTimeout(timer);
        timer = setTimeout(() => {
          refreshCache(key).catch((err) =>
            console.error(`Cache refresh from change stream failed for "${key}":`, err?.message || err)
          );
        }, 300);
      });
      stream.on("error", (err) => {
        console.error(`Change stream for "${key}" stopped:`, err?.message || err);
      });
    } catch (err) {
      console.error(`Could not watch "${key}" (standalone MongoDB?):`, err?.message || err);
    }
  });
  console.log("Change streams watching:", Object.keys(models).join(", "));
};

// Load every collection into RAM. Run once the MongoDB connection is open.
const warmCache = async () => {
  const results = await Promise.allSettled(
    Object.keys(loaders).map((key) => refreshCache(key, { broadcast: false }))
  );
  results.forEach((r, i) => {
    const key = Object.keys(loaders)[i];
    if (r.status === "rejected") {
      console.error(`Cache warm-up failed for "${key}":`, r.reason?.message || r.reason);
    }
  });
  console.log("In-memory cache warmed:", Object.keys(store).map((k) => `${k}=${store[k].length}`).join(", "));
  watchCollections();
};

export { getCached, refreshCache, warmCache };
