// Turn any thrown error into a response the UI can actually explain to the
// user: a proper status code and a human-readable message saying what went
// wrong, instead of a generic "server error" or a raw error object.

const describeError = (err, action = "complete the request") => {
  // Mongoose schema validation — name each field that failed and why
  if (err?.name === "ValidationError" && err.errors) {
    const details = Object.values(err.errors)
      .map((e) => (e.kind === "required" ? `"${e.path}" is required` : `"${e.path}": ${e.message}`))
      .join("; ");
    return { status: 400, message: `Invalid data — ${details}.` };
  }

  // Bad MongoDB ObjectId (malformed id in the URL)
  if (err?.name === "CastError") {
    return { status: 400, message: `Invalid ${err.path || "id"} format: "${err.value}".` };
  }

  // Duplicate unique key
  if (err?.code === 11000) {
    const fields = Object.keys(err.keyValue || {}).join(", ") || "value";
    return { status: 409, message: `Duplicate entry — a record with the same ${fields} already exists.` };
  }

  // MongoDB unreachable (Atlas down, no internet, DNS failure, not connected yet)
  if (
    err?.name === "MongooseServerSelectionError" ||
    err?.name === "MongoNetworkError" ||
    err?.name === "MongooseError" && /buffering timed out/i.test(err.message || "")
  ) {
    return {
      status: 503,
      message: "Database is unreachable — the server could not connect to MongoDB. Check the internet connection / MongoDB Atlas status and try again.",
    };
  }

  // Multer upload errors (file too large, unexpected field, ...)
  if (err?.name === "MulterError") {
    return { status: 400, message: `File upload failed: ${err.message}${err.field ? ` (field "${err.field}")` : ""}.` };
  }

  // Anything else: keep the real reason visible instead of hiding it
  const reason = err?.message ? ` Reason: ${err.message}` : "";
  return { status: 500, message: `Failed to ${action}.${reason}` };
};

export default describeError;
