let pending = false;
let repeat = false;

function request() {
  if (pending) repeat = true;
  else {
    pending = true;
    repeat = false;
    axios
      .get(`${CLIENT_URL}/${CLIENT_CACHE}`)
      .catch(onError)
      .finally(onComplete);
  }
}

function onError(error) {
  // Handle error
  console.error("Request error:", error);
}

function onComplete() {
  pending = false;
  if (repeat) request();
}

// ------------------
// Hooks
// ------------------

export default function ({ action }) {
  action("items.create", request);
  action("items.update", request);
  action("items.delete", request);
}
