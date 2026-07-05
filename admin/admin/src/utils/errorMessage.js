// Turn any failed request (axios error, fetch error, or a success:false
// response body) into a message that says what actually went wrong,
// instead of a generic "server error".

const STATUS_HINTS = {
  400: "The data sent was invalid.",
  401: "You are not logged in or your session expired — log in again.",
  403: "You don't have permission to do this.",
  404: "The requested item or API route was not found.",
  409: "This conflicts with data that already exists.",
  413: "The uploaded file is too large.",
  500: "The server hit an internal error.",
  503: "The server can't reach its database right now.",
};

export function getErrorMessage(err, fallback = "Something went wrong.") {
  // axios error with a response: prefer the backend's descriptive message
  if (err?.response) {
    const serverMsg = err.response.data?.message || err.response.data?.error;
    if (serverMsg) return serverMsg;
    const hint = STATUS_HINTS[err.response.status] || "";
    return `${fallback} Server responded with ${err.response.status} ${err.response.statusText || ""}. ${hint}`.trim();
  }

  // axios error with no response at all: server unreachable
  if (err?.request) {
    return "Can't reach the server — make sure the backend is running on http://localhost:3000 and check your internet connection.";
  }

  // fetch() network failure ("Failed to fetch" / "NetworkError")
  if (err instanceof TypeError && /fetch|network/i.test(err.message)) {
    return "Can't reach the server — make sure the backend is running on http://localhost:3000 and check your internet connection.";
  }

  // Response body parse failure (server returned HTML instead of JSON)
  if (err instanceof SyntaxError) {
    return `${fallback} The server sent an unreadable response — it may have crashed or the API URL is wrong.`;
  }

  return err?.message ? `${fallback} Reason: ${err.message}` : fallback;
}

// For success:false JSON bodies (no exception thrown): pull out the
// backend's message if it exists.
export function getResponseMessage(body, fallback) {
  return body?.message || body?.error || fallback;
}
