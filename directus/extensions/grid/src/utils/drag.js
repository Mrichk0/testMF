import { onMounted, onUnmounted, reactive } from "vue";

export default function ({ grid, tiles, onDragEnd }) {
  // ---------------------
  // State
  // ---------------------

  const state = reactive({
    active: null,
    action: null,
    origin: null,
    pageX: 0,
    pageY: 0,
  });

  // ---------------------
  // Helpers
  // ---------------------

  let $content = null;

  function pageX(event) {
    return event.clientX + $content.scrollLeft;
  }

  function pageY(event) {
    return event.clientY + $content.scrollTop;
  }

  function getBounds({ x1, x2, y1, y2 }) {
    return { x1, x2, y1, y2 };
  }

  // -------------------
  // Start
  // -------------------

  function start(event, action, tile) {
    state.active = tile;
    state.action = action;
    state.origin = getBounds(tile);
    state.pageX = pageX(event);
    state.pageY = pageY(event);
  }

  // -------------------
  // Move
  // -------------------

  function move(event) {
    if (!state.active) return;

    const bounds = getBounds(state.active);
    const x = Math.round((pageX(event) - state.pageX) / grid.scaleX);
    const y = Math.round((pageY(event) - state.pageY) / grid.scaleY);

    if (state.action === "add") {
      const cell = grid.getCell(event);
      bounds.x1 = Math.min(cell.x1, state.origin.x1);
      bounds.y1 = Math.min(cell.y1, state.origin.y1);
      bounds.x2 = Math.max(cell.x2, state.origin.x2);
      bounds.y2 = Math.max(cell.y2, state.origin.y2);
    }
    if (state.action === "move") {
      bounds.x1 = state.origin.x1 + x;
      bounds.y1 = state.origin.y1 + y;
      bounds.x2 = state.origin.x2 + x;
      bounds.y2 = state.origin.y2 + y;
    }
    if (state.action === "resize-1") {
      bounds.x1 = state.origin.x1 + x;
      bounds.y1 = state.origin.y1 + y;
    }
    if (state.action === "resize-2") {
      bounds.y1 = state.origin.y1 + y;
    }
    if (state.action === "resize-3") {
      bounds.y1 = state.origin.y1 + y;
      bounds.x2 = state.origin.x2 + x;
    }
    if (state.action === "resize-4") {
      bounds.x2 = state.origin.x2 + x;
    }
    if (state.action === "resize-5") {
      bounds.x2 = state.origin.x2 + x;
      bounds.y2 = state.origin.y2 + y;
    }
    if (state.action === "resize-6") {
      bounds.y2 = state.origin.y2 + y;
    }
    if (state.action === "resize-7") {
      bounds.x1 = state.origin.x1 + x;
      bounds.y2 = state.origin.y2 + y;
    }
    if (state.action === "resize-8") {
      bounds.x1 = state.origin.x1 + x;
    }

    bounds.x1 = Math.max(bounds.x1, 0);
    bounds.x2 = Math.max(bounds.x2, 1);
    bounds.x1 = Math.min(bounds.x1, grid.cols - 1);
    bounds.x2 = Math.min(bounds.x2, grid.cols);
    bounds.y1 = Math.max(bounds.y1, 0);
    bounds.y2 = Math.max(bounds.y2, 1);

    const interception = tiles.getInterception(bounds, state.active);
    if (!interception) Object.assign(state.active, bounds);
  }

  // -------------------
  // End
  // -------------------

  function end(event) {
    if (!state.active) return;
    const { action, active } = state;
    state.active = null;
    onDragEnd(event, action, active);
  }

  // -------------------
  // Hooks
  // -------------------

  onMounted(() => {
    $content = document.getElementById("main-content");
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);
    document.addEventListener("mouseleave", end);
  });

  onUnmounted(() => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", end);
    document.removeEventListener("mouseleave", end);
  });

  // -------------------
  // Exports
  // -------------------

  return Object.assign(state, {
    start,
  });
}
