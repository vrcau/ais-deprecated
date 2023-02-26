import AISStatus from "@/types/CycleInfo"

export default defineEventHandler((event) => {
  return new AISStatus(3, new Date(2023, 2, 25).getTime(), 1, 3, 10);
})
