// import { useStores } from "@directus/extensions-sdk";

// export default function setupRelation({ props }) {
//   const { useRelationsStore, useFieldsStore } = useStores();
//   const { getRelationsForField } = useRelationsStore();
//   const { getFieldsForCollection } = useFieldsStore();
//   const [relation] = getRelationsForField(props.collection, props.field);
//   const fields = getFieldsForCollection(relation.collection)
//     .filter((item) => item.field !== relation.field)
//     .map((item) => item.field);

//   return {
//     fields,
//     field: relation.field,
//     collection: relation.collection,
//   };
// }

import { useStores } from "@directus/extensions-sdk";

export default function ({ props }) {
  const { useRelationsStore, useFieldsStore } = useStores();
  const { getRelationsForField } = useRelationsStore();
  const { getFieldsForCollection } = useFieldsStore();
  const [relation] = getRelationsForField(props.collection, props.field);
  const fields = getFieldsForCollection(relation.collection)
    .filter((item) => item.field !== relation.field)
    .map((item) => item.field);

  return {
    fields,
    field: relation.field,
    collection: relation.collection,
  };
}
