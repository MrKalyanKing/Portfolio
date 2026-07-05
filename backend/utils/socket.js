import { Server } from "socket.io";
import jwt from "jsonwebtoken";

// Real-time layer. Clients are listeners only — the server pushes fresh
// collection data whenever a write goes through the cache layer.
//
//  - Default namespace ("/"): the public portfolio site. Only ever receives
//    PUBLIC_COLLECTIONS — private data (contacts) is never broadcast here.
//  - "/admin" namespace: requires a valid login JWT in the connection
//    handshake and additionally receives private collections.
//
// Allowed origins come from SOCKET_ORIGINS in .env (comma-separated), e.g.
//   SOCKET_ORIGINS=https://myportfolio.com,https://admin.myportfolio.com
// When unset (local development) all origins are allowed.

const PUBLIC_COLLECTIONS = new Set(["project", "work", "tech", "skill"]);

let io = null;

const initSocket = (httpServer) => {
  const allowedOrigins = process.env.SOCKET_ORIGINS
    ? process.env.SOCKET_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean)
    : "*";

  io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
    serveClient: false, // clients bundle their own socket.io-client
    maxHttpBufferSize: 1024, // clients only listen; reject large inbound payloads
  });

  // Public namespace: read-only. Any client-sent event is ignored and the
  // socket is dropped — nothing legitimate ever emits from the portfolio site.
  io.on("connection", (socket) => {
    socket.onAny(() => socket.disconnect(true));
  });

  // Admin namespace: handshake must carry a JWT issued by /api/login.
  const adminNsp = io.of("/admin");
  adminNsp.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Unauthorized: missing token"));
    try {
      socket.data.user = jwt.verify(token, process.env.JWT);
      return next();
    } catch (err) {
      return next(new Error("Unauthorized: invalid or expired token"));
    }
  });
  adminNsp.on("connection", (socket) => {
    socket.onAny(() => socket.disconnect(true));
  });

  console.log("Socket.IO ready (origins:", allowedOrigins, ")");
  return io;
};

// Push a collection's fresh data to connected clients. Called by the cache
// layer after every write, so REST responses and live pushes never drift.
const broadcastUpdate = (collection, data) => {
  if (!io) return; // server started without sockets (e.g. tests)
  const payload = { collection, data, updatedAt: new Date().toISOString() };

  if (PUBLIC_COLLECTIONS.has(collection)) {
    io.emit("collection:update", payload);
  }
  // Admins receive everything, including private collections.
  io.of("/admin").emit("collection:update", payload);
};

export { initSocket, broadcastUpdate };
