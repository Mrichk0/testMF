<!-- TextTile.vue -->
<template>
  <div class="text-tile" :style="contentStyle">
    <div class="text-content" v-if="tile.text">{{ tile.text }}</div>
    <div v-else class="placeholder">Введіть текст</div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["tile"]);

const contentStyle = computed(() => ({
  fontSize: `${props.tile.fontSize || 16}px`,
  color: props.tile.textColor || "#000000",
  backgroundColor: props.tile.backgroundColor || "#ffffff",
}));
</script>

<style scoped>
.text-tile {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}

.text-content {
  word-break: break-word;
  text-align: center;
}

.placeholder {
  opacity: 0.5;
}
</style>
