<template>
  <drawer-item
    :active="!!props.tile"
    :collection="props.relation.collection"
    :circular-field="props.relation.field"
    :primary-key="props.tile?.id || '+'"
    :edits="props.tile?.edits"
    @input="save"
    @update:active="cancel"
  />
</template>

<script setup>
const props = defineProps(["tile", "relation"]);

const emit = defineEmits(["save", "cancel"]);

function merge(field, edits) {
  if (field in edits) props.tile[field] = edits[field];
  else if (props.tile.origin[field] !== undefined)
    props.tile[field] = props.tile.origin[field];
}

function save(edits) {
  props.relation.fields.forEach((field) => merge(field, edits));
  emit("save", props.tile);
}

function cancel() {
  emit("cancel", props.tile);
}
</script>
