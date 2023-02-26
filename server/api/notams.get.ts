import Notam from "~~/types/Notam";

export default defineEventHandler((event) => {
  return [
    new Notam()
  ];
})
