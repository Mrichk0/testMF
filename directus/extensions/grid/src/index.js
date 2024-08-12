import InterfaceComponent from "./interface.vue";
console.log(InterfaceComponent);
export default {
  id: "grid",
  name: "Grid",
  icon: "box",
  description: "Grid layout interface",
  component: InterfaceComponent,
  types: ["alias"],
  localTypes: ["o2m"],
  group: "standard",
  options: null,
};
