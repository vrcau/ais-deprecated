import Airport from "~/types/Airport"

export default defineEventHandler((event) => {
  return new Airport(event.context.params?.icao.toUpperCase() || 'ZVAU', "枝江/航大")
})
