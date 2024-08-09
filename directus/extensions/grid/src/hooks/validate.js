import _ from "lodash";
import { createError } from "@directus/errors";
import { ItemsService } from "@directus/api/services/index";

// ------------------
// Data
// ------------------

const sizes = ["1x2", "2x4", "2x2", "3x3"];

const error = {
  code: "FAILED_VALIDATION",
  status: 400,
  type: "custom",
  field: "template",
  collection: "projects",
};

// ------------------
// Helpers
// ------------------

function exception(message, tiles) {
  const { code, status, ...options } = error;
  const Error = createError(code, message, status);
  return new Error({ tiles, message, ...options });
}

function getIndexes(origin, filtered) {
  return filtered.map((item) => origin.indexOf(item));
}

function getNeighbours(tile, index, tiles) {
  return tiles.filter((neighbour) => {
    if (tile === neighbour) return true;
    const y1 = Math.max(tile.y1, neighbour.y1);
    const y2 = Math.min(tile.y2, neighbour.y2);
    return y2 > y1;
  });
}

function setSort(tiles, template) {
  const sorted = [...tiles].sort((a, b) => a.y1 - b.y1 || a.x1 - b.x1);
  tiles.forEach((tile, index) => (template[index].sort = sorted.indexOf(tile)));
}

// ------------------
// Validations
// ------------------

function checkMisSized(tiles) {
  const message = `Some tiles have invalid size. Valid sizes: ${sizes.join(
    ", "
  )}`;
  const invalid = tiles.filter(
    (tile) =>
      !sizes.find(
        (size) => size === `${tile.x2 - tile.x1}x${tile.y2 - tile.y1}`
      )
  );
  if (invalid.length) throw exception(message, getIndexes(tiles, invalid));
}

function checkMisRowed(tiles) {
  const message = "There should be no more than two tiles in a row";
  const invalid = _.uniq(
    tiles
      .map(getNeighbours)
      .filter((neighbour) => neighbour.length > 2)
      .flat()
  );
  if (invalid.length) throw exception(message, getIndexes(tiles, invalid));
}

// ------------------
// Loader
// ------------------

function load(ids, ctx) {
  const service = new ItemsService("tiles", ctx);
  return service.readByQuery({
    fields: ["id", "x1", "y1", "x2", "y2"],
    filter: { id: { _in: ids } },
  });
}

async function getTiles(template, ctx) {
  const ids = template.map((tile) => tile.id).filter((id) => id);
  const records = ids.length ? await load(ids, ctx) : [];
  return template.map((tile) => {
    const origin = records.find((item) => item.id === tile.id);
    return { ...origin, ...tile };
  });
}

// ------------------
// Hook
// ------------------

async function validate(input, meta, ctx) {
  if (!input.template) return;
  const template = input.template.map((tile) =>
    _.isNumber(tile) ? { id: tile } : tile
  );
  const tiles = await getTiles(template, ctx);
  checkMisSized(tiles);
  checkMisRowed(tiles);
  setSort(tiles, template);
  input.template = template;
}

export default function ({ filter }) {
  filter("projects.items.create", validate);
  filter("projects.items.update", validate);
}
