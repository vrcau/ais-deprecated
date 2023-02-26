import Airport from "~/types/Airport";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  return [new Airport("ZVAU", "枝江/航大")];
});
