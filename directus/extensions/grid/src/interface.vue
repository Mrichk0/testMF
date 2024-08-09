<template>
  <div class="grid-interface">
    <div
      v-if="isGridReady"
      class="grid-container"
      ref="$el"
      :style="containerStyle"
      @mousedown="add"
    >
      <div
        v-for="col in grid.cols - 1"
        :key="'v' + col"
        class="grid-line grid-line--vertical"
        :style="{ left: `${(col * 100) / grid.cols}%` }"
      ></div>
      <div
        v-for="row in grid.rows - 1"
        :key="'h' + row"
        class="grid-line grid-line--horizontal"
        :style="{ top: `${(row * 100) / grid.rows}%` }"
      ></div>
      <tile
        v-for="(tile, index) in tiles.list"
        :key="tile.id || index"
        :tile="tile"
        :grid="grid"
        @enter="enter"
        @leave="leave"
        @start="start"
        @edit="edit"
        @remove="remove"
      />
    </div>
    <drawer
      :tile="editing"
      :relation="relation"
      @cancel="cancel"
      @save="save"
    />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted } from "vue";
import Tile from "./components/tile.vue";
import Drawer from "./components/drawer.vue";
import setupDrag from "./utils/drag.js";
import setupGrid from "./utils/grid.js";
import setupTiles from "./utils/tiles.js";
import setupRelation from "./utils/relation.js";

export default defineComponent({
  components: { Tile, Drawer },
  props: ["value", "field", "collection"],
  emits: ["input"],
  setup(props, { emit }) {
    const $el = ref(null);
    const editing = ref(null);
    const isGridReady = ref(false);

    const relation = setupRelation({ props });
    const grid = reactive(setupGrid({ $el }));
    const tiles = setupTiles({ grid, props, emit, relation });
    const drag = setupDrag({ grid, tiles, onDragEnd: end });

    const containerStyle = computed(() => ({
      height: grid.rows ? `${grid.rows * (grid.scaleY || 1)}px` : "100%",
      width: "100%",
      position: "relative",
    }));

    onMounted(() => {
      if (grid.cols && grid.rows) {
        isGridReady.value = true;
      } else {
        console.error("Grid is not initialized correctly");
      }
    });

    function enter(tile) {
      if (drag.active) return;
      if (tile) tile.class = "hover";
    }

    function leave(tile) {
      if (drag.active) return;
      if (tile && tile.class === "add") return;
      if (tile) tile.class = null;
    }

    function add(event) {
      if (event.target !== $el.value) return;
      const cell = grid.getCell(event);
      const tile = tiles.add(cell);
      start(event, "add", tile);
    }

    function start(event, action, tile) {
      if (tile) tile.class = action;
      drag.start(event, action, tile);
    }

    function end(event, action, tile) {
      if (action === "add") return edit(tile);
      if (tile) tile.class = null;
      const cell = grid.getCell(event);
      const target = tiles.getInterception(cell);
      if (target) target.class = "hover";
    }

    function remove(tile) {
      tiles.remove(tile);
    }

    function edit(tile) {
      editing.value = tile;
    }

    function cancel(tile) {
      if (tile && tile.class === "add") remove(tile);
      editing.value = null;
    }

    function save(tile) {
      if (tile && tile.class === "add") tile.class = null;
      editing.value = null;
    }

    return {
      $el,
      editing,
      grid,
      tiles,
      relation,
      containerStyle,
      isGridReady,
      enter,
      leave,
      add,
      start,
      edit,
      remove,
      cancel,
      save,
    };
  },
});
</script>

<style scoped>
.grid-interface {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
}

.grid-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.grid-line {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.grid-line--vertical {
  width: 1px;
  height: 100%;
  top: 0;
}

.grid-line--horizontal {
  width: 100%;
  height: 1px;
  left: 0;
}
</style>
