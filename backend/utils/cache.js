import projectmodel from "../models/ProjectModel.js";
import ExpereinceModel from "../models/Expereince.js";
import techModel from "../models/TechStack.js";
import skillmodel from "../models/skills.js";
import contactModel from "../models/Contact.js";
import { broadcastUpdate } from "./socket.js";

// In-memory cache: one entry per collection, served from RAM instead of
// hitting MongoDB on every request. Loaded on server start (warmCache) and
// re-synced by the write controllers whenever data is added/edited/deleted.

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
  return store[key];
};

// Serve from RAM; only falls back to MongoDB if the key was never loaded
// (e.g. a request arrived before the warm-up finished or warm-up failed).
const getCached = async (key) => {
  if (store[key]) return store[key];
  return refreshCache(key, { broadcast: false });
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
};

export { getCached, refreshCache, warmCache };
