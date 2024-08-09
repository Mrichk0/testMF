<template>
  <div
    v-if="isReady"
    class="grid-tile"
    :class="[tile.class, { 'grid-tile--error': tile.error }]"
    :style="tileStyle"
    @mouseenter="$emit('enter', tile)"
    @mouseleave="$emit('leave', tile)"
  >
    <img
      v-if="tile.image"
      :src="`/assets/${tile.image}`"
      alt="Tile image"
      class="grid-tile__image"
    />
    <div class="grid-tile__frame">
      <a
        v-for="n in 8"
        :key="n"
        @mousedown="resize($event, n)"
        class="grid-tile__handle"
      ></a>
    </div>
    <div class="grid-tile__nav">
      <v-button icon rounded @click="$emit('edit', tile)" v-tooltip="'Edit'">
        <v-icon name="edit" />
      </v-button>
      <v-button
        icon
        rounded
        @mousedown="$emit('start', $event, 'move', tile)"
        v-tooltip="'Move'"
      >
        <v-icon name="drag_handle" />
      </v-button>
      <v-button
        icon
        rounded
        @click="$emit('remove', tile)"
        v-tooltip="'Delete'"
      >
        <v-icon name="close" />
      </v-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Tile",
  props: ["tile", "grid"],
  emits: ["enter", "leave", "start", "edit", "remove"],
  setup(props) {
    const isReady = computed(
      () => props.tile && props.grid && props.grid.cols && props.grid.rows
    );

    const tileStyle = computed(() => {
      if (!isReady.value) return {};
      return {
        left: `${(props.tile.x1 * 100) / props.grid.cols}%`,
        top: `${(props.tile.y1 * 100) / props.grid.rows}%`,
        width: `${((props.tile.x2 - props.tile.x1) * 100) / props.grid.cols}%`,
        height: `${((props.tile.y2 - props.tile.y1) * 100) / props.grid.rows}%`,
      };
    });

    function resize(event, n) {
      emit("start", event, `resize-${n}`, props.tile);
    }

    return { isReady, tileStyle, resize };
  },
});
</script>

<style scoped>
.grid-tile {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.grid-tile:hover {
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.grid-tile--error {
  border-color: red;
}

.grid-tile__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.grid-tile__frame {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.grid-tile__handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 50%;
}

.grid-tile__nav {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 5px;
}

.grid-tile__nav .v-button {
  --v-button-background-color: white;
  --v-button-color: #666;
  --v-button-background-color-hover: #f5f5f5;
  --v-button-color-hover: #333;
}
</style>
