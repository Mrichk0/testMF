import { reactive, computed, onMounted, onUnmounted } from "vue";

export default function setupGrid({ $el }) {
  const grid = reactive({
    $el,
    cols: 3,
    rows: 4,
    width: 0,
    ratio: 0.64,
  });

  const scaleX = computed(() => grid.width / grid.cols);
  const scaleY = computed(() => scaleX.value * grid.ratio);

  function getCell(event) {
    const rect = grid.$el.getBoundingClientRect();
    const x1 = Math.floor((event.clientX - rect.x) / scaleX.value);
    const y1 = Math.floor((event.clientY - rect.y) / scaleY.value);
    return { x1, y1, x2: x1 + 1, y2: y1 + 1 };
  }

  function resize() {
    setTimeout(() => {
      grid.width = $el.value.offsetWidth;
    });
  }

  onMounted(() => {
    window.addEventListener("resize", resize);
    resize();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
  });

  return Object.assign(grid, {
    scaleX,
    scaleY,
    getCell,
  });
}
