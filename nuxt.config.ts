export default defineNuxtConfig({
  ssr: false,
  modules: ["@element-plus/nuxt", "@nuxtjs/sanity"],
  sanity: {
    projectId: "0em98gqr",
    apiVersion: "2021-10-21",
  },
});
