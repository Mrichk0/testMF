import { reactive, computed, watch, toRaw } from "vue";
import { useApi } from "@directus/extensions-sdk";

export default function setupTiles({ grid, props, emit, relation }) {
  const api = useApi();

  const state = reactive({
    error: false,
    loading: false,
    initial: null,
    list: [],
  });

  function getInterception(bounds, exclude = null) {
    return state.list.find((tile) => {
      if (tile === exclude) return;
      const x = Math.max(tile.x1, bounds.x1);
      const y = Math.max(tile.y1, bounds.y1);
      const w = Math.min(tile.x2, bounds.x2);
      const h = Math.min(tile.y2, bounds.y2);
      return w > x && h > y;
    });
  }

  function getData(tile) {
    return relation.fields.reduce((data, field) => {
      data[field] = tile[field];

      return data;
    }, {});
  }

  function getDiff(curr, prev) {
    return Object.keys(curr).reduce((edits, key) => {
      if (curr[key] !== prev[key]) edits[key] = curr[key];
      return edits;
    }, {});
  }

  function getEdits(tile) {
    return computed(() => {
      const { id, ...data } = getData(tile);
      return id ? getDiff(data, tile.origin) : data;
    });
  }

  function getStyle(tile) {
    return computed(() => ({
      left: tile.x1 * grid.scaleX + "px",
      top: tile.y1 * grid.scaleY + "px",
      width: (tile.x2 - tile.x1) * grid.scaleX + "px",
      height: (tile.y2 - tile.y1) * grid.scaleY + "px",
    }));
  }

  function add(item) {
    const tile = reactive({ ...item });

    tile.origin = item;
    tile.style = getStyle(tile);
    tile.edits = getEdits(tile);

    state.list.push(tile);
    return tile;
  }

  function remove(tile) {
    const index = state.list.indexOf(tile);
    state.list.splice(index, 1);
  }

  const rows = computed(() => {
    return Math.max(0, ...state.list.map((tile) => tile.y2));
  });

  watch(rows, (value) => {
    grid.rows = value + 4;
  });

  const output = computed(() => {
    return state.list.map((tile) => {
      const { id, edits } = tile;
      return Object.keys(edits).length ? { id, ...edits } : id;
    });
  });

  watch(output, (value) => {
    emit("input", value);
  });

  watch(
    () => props.value,
    (value) => {
      if (!Array.isArray(value) || value.length === 0) return;

      if (value === state.initial) return;
      if (JSON.stringify(toRaw(value)) === JSON.stringify(output.value)) return;

      const filter = { id: { _in: value } };
      const params = { fields: [relation.fields, "translations.*"], filter };

      api
        .get(`/items/${relation.collection}`, { params })
        .then((response) => {
          const data = response.data.data;
          state.list = [];
          const itemMap = new Map(data.map((item) => [item.id, item]));

          value.forEach((id) => {
            const foundItem = itemMap.get(id);
            if (foundItem) {
              add(foundItem);
            } else {
              console.warn(
                `Element with ${id} not found in collection ${relation.collection}`
              );
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    },
    { immediate: true }
  );

  return Object.assign(state, {
    add,
    remove,
    getInterception,
  });
}
