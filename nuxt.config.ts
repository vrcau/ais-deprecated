export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/sanity"],
  sanity: {
    projectId: "0em98gqr",
    apiVersion: "2021-10-21",
    useCdn: true,
  },
});
