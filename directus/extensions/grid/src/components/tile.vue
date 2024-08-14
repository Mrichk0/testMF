<template>
  <div
    class="tile"
    :style="tile.style"
    :class="[
      className,
      {
        'tile--error': tile.error,
        'tile--translated': hasTranslationText,
        'iframe-wrapper': hasVideo,
      },
    ]"
    @mouseenter="emit('enter')"
    @mouseleave="emit('leave')"
  >
    <img v-if="tile.image" :src="`/assets/${tile.image}`" />

    <div v-if="hasTranslationText" class="text">
      {{ tile.translations.create[0].text }}
    </div>
    <div v-if="tile.type === 'video'" class="video-tile">
      <iframe
        :src="'https://www.youtube.com/embed/' + getYouTubeId(tile.video_url)"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <div class="tile-frame">
      <a v-for="n in 8" @mousedown="resize($event, n)" />
    </div>
    <div class="tile-nav">
      <v-button
        v-tooltip="'Edit'"
        icon
        rounded
        @click="emit('edit')"
        class="custom-button"
      >
        <v-icon name="edit" class="custom-icon" />
      </v-button>
      <v-button
        v-tooltip="'Move'"
        icon
        rounded
        @mousedown="move"
        class="custom-button"
      >
        <v-icon name="drag_handle" class="custom-icon" />
      </v-button>
      <v-button
        v-tooltip="'Delete'"
        icon
        rounded
        @click="emit('remove')"
        class="custom-button"
      >
        <v-icon name="close" class="custom-icon" />
      </v-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["tile"]);

console.log(props.tile);

const emits = defineEmits(["enter", "leave", "start", "remove", "edit"]);

const className = computed(() => {
  const cls = props.tile.class;
  if (!cls) return "tile--inactive";
  if (cls.startsWith("resize")) return "tile--resize";
  return `tile--${cls}`;
});
function getYouTubeId(url) {
  if (typeof url !== "string") return null;
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const hasVideo = computed(() => {
  return props.tile.type === "video";
});

const hasTranslationText = computed(() => {
  return (
    props.tile.translations &&
    props.tile.translations.create &&
    props.tile.translations.create.length > 0 &&
    props.tile.translations.create[0].text
  );
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

<style scoped>
/* iframe */
.iframe-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
}

.iframe-wrapper iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border: none;
}

/* Адаптивні стилі */
@media (max-width: 768px) {
  .iframe-wrapper {
    padding-bottom: 75%; /* 4:3 Aspect Ratio для мобільних пристроїв */
  }
}
/* root */

.tile--translated {
  padding: 10px;
  background-color: #fff;
  overflow: hidden;

  z-index: 1;
}

.tile {
  position: absolute;
  padding: 2px;
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
  inset: 2px;
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

.custom-button {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #ccc;
}

.custom-icon {
  color: #333;
}

.custom-button:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.custom-button:hover .custom-icon {
  color: #000;
}
</style>
