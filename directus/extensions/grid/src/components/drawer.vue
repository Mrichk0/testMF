<template>
  <drawer-item
    :active="!!tile"
    :collection="relation.collection"
    :circular-field="relation.field"
    :primary-key="tile?.id || '+'"
    :edits="tile?.edits"
    @input="save"
    @update:active="cancel"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Drawer",
  props: ["tile", "relation"],
  emits: ["save", "cancel"],
  setup(props, { emit }) {
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

    return { save, cancel };
  },
});
</script>
