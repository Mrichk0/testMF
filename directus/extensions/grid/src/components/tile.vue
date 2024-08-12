<!--<template>
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
</script>-->

<!--<style scoped>
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
</style>-->

<!--
    Styles
-->

<style scoped>
/* root */

.tile {
  position: absolute;
  padding: 6px;
  transition-duration: 0.1s;
  transition-property: top, left, width, height;
}
.tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* frame */

.tile-frame {
  position: absolute;
  inset: 6px;
  border: 1px solid var(--primary);
  background: rgba(38, 50, 56, 0.2);
}
.tile-frame a {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--white);
  border: 1px solid var(--primary);
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.tile-frame a:nth-child(1) {
  top: 0;
  left: 0;
  cursor: nw-resize;
}
.tile-frame a:nth-child(2) {
  top: 0;
  left: 50%;
  cursor: n-resize;
}
.tile-frame a:nth-child(3) {
  top: 0;
  left: 100%;
  cursor: ne-resize;
}
.tile-frame a:nth-child(4) {
  top: 50%;
  left: 100%;
  cursor: e-resize;
}
.tile-frame a:nth-child(5) {
  top: 100%;
  left: 100%;
  cursor: se-resize;
}
.tile-frame a:nth-child(6) {
  top: 100%;
  left: 50%;
  cursor: s-resize;
}
.tile-frame a:nth-child(7) {
  top: 100%;
  left: 0;
  cursor: sw-resize;
}
.tile-frame a:nth-child(8) {
  top: 50%;
  left: 0;
  cursor: w-resize;
}

/* nav */

.tile-nav {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tile-nav .v-button {
  margin: 0 4px;
  --v-icon-size: 16px;
  --v-button-height: 32px;
  --v-button-color: var(--foreground-subdued);
  --v-button-background-color: var(--white);
  --v-button-color-hover: var(--foreground-normal);
  --v-button-background-color-hover: var(--white);
}

/* modifiers */

.tile--inactive .tile-frame {
  display: none;
}
.tile--inactive .tile-nav {
  display: none;
}

.tile--add .tile-frame a {
  display: none;
}
.tile--add .tile-nav {
  display: none;
}

.tile--move .tile-frame a {
  display: none;
}
.tile--move .tile-nav .v-button:not(:nth-child(2)) {
  display: none;
}

.tile--resize .tile-nav {
  display: none;
}
.tile--error {
  background: var(--danger);
}
.tile--error img {
  opacity: 0.8;
}
</style>

<!--
    Template
-->

<template>
  <div
    class="tile"
    :style="tile.style"
    :class="[className, { 'tile--error': tile.error }]"
    @mouseenter="emit('enter')"
    @mouseleave="emit('leave')"
  >
    <img v-if="tile.image" :src="`/assets/${tile.image}`" />
    <div class="tile-frame">
      <a v-for="n in 8" @mousedown="resize($event, n)" />
    </div>
    <div class="tile-nav">
      <v-button v-tooltip="'Edit'" icon rounded @click="emit('edit')">
        <v-icon name="edit" />
      </v-button>
      <v-button v-tooltip="'Move'" icon rounded @mousedown="move">
        <v-icon name="drag_handle" />
      </v-button>
      <v-button v-tooltip="'Delete'" icon rounded @click="emit('remove')">
        <v-icon name="close" />
      </v-button>
    </div>
  </div>
</template>

<!--
    Scripts
-->

<script setup>
import { computed } from "vue";

const props = defineProps(["tile"]);

const emits = defineEmits(["enter", "leave", "start", "remove", "edit"]);

const className = computed(() => {
  const cls = props.tile.class;
  if (!cls) return "tile--inactive";
  if (cls.startsWith("resize")) return "tile--resize";
  return `tile--${cls}`;
});

function emit(...args) {
  emits(...args, props.tile);
}

function resize(event, n) {
  emit("start", event, `resize-${n}`);
}

function move(event) {
  emit("start", event, "move");
}
</script>
