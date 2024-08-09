import { reactive, onMounted, onUnmounted } from "vue";

export default function setupDrag({ grid, tiles, onDragEnd }) {
  const state = reactive({
    active: null,
    action: null,
    origin: null,
    pageX: 0,
    pageY: 0,
  });

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

  function start(event, action, tile) {
    state.active = tile;
    state.action = action;
    state.origin = getBounds(tile);
    state.pageX = pageX(event);
    state.pageY = pageY(event);
  }

  function move(event) {
    if (!state.active) return;

    const bounds = getBounds(state.active);
    const x = Math.round((pageX(event) - state.pageX) / grid.scaleX);
    const y = Math.round((pageY(event) - state.pageY) / grid.scaleY);

    // Update bounds based on action (add, move, resize)
    // ... (logic for different actions)

    const interception = tiles.getInterception(bounds, state.active);
    if (!interception) Object.assign(state.active, bounds);
  }

  function end(event) {
    if (!state.active) return;
    const { action, active } = state;
    state.active = null;
    onDragEnd(event, action, active);
  }

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

  return Object.assign(state, {
    start,
  });
}
