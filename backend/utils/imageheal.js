import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import imagekit from "./imagekit.js";
import projectmodel from "../models/ProjectModel.js";

// Self-healing for project images.
//
// Old backend code stored uploaded images as bare filenames, which only
// render on the exact server that received the upload. Any instance running
// THIS code watches the project cache: when it sees a bare-filename image it
// uploads the file to ImageKit and rewrites the DB record to the hosted URL.
// The DB write triggers the change stream, so every instance (and every
// connected browser) receives the fixed URL automatically.
//
// The file is looked up in this server's own uploads/ folder first, then
// fetched from the deployed server's /uploads route (REMOTE_UPLOADS_URL).

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

// Filenames we already tried (successfully or not) — prevents retry loops
// when a file is gone from every source or ImageKit rejects it.
const attempted = new Set();

const loadFileBuffer = async (filename) => {
  const localPath = path.join(UPLOADS_DIR, filename);
  if (fs.existsSync(localPath)) return fs.readFileSync(localPath);

  const remoteBase = (process.env.REMOTE_UPLOADS_URL || "http://13.126.4.35:3000/uploads").replace(/\/+$/, "");
  const res = await fetch(`${remoteBase}/${encodeURIComponent(filename)}`);
  if (!res.ok) throw new Error(`file not found locally and remote returned ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
};

// Fire-and-forget: called with the freshly cached project list.
const healProjectImages = async (projects) => {
  if (!imagekit || !Array.isArray(projects)) return;

  const broken = projects.filter(
    (p) => p.image && !String(p.image).startsWith("http") && !attempted.has(p.image)
  );

  for (const p of broken) {
    attempted.add(p.image);
    try {
      const buffer = await loadFileBuffer(p.image);
      const upload = await imagekit.upload({
        file: buffer,
        fileName: p.image,
        folder: "/portfolio_projects",
      });
      await projectmodel.updateOne({ _id: p._id }, { $set: { image: upload.url } });
      console.log(`Healed project image: ${p.image} -> ${upload.url}`);
    } catch (err) {
      console.error(`Could not heal image "${p.image}" (${p.title}):`, err?.message || err);
    }
  }
};

export { healProjectImages };
