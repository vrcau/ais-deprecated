module.exports = {
  client: {
    service: {
      name: 'vau-ais',
      // GraphQL API 的 URL
      url: 'https://ap-northeast-1.cdn.hygraph.com/content/clhku5ux83vyw01t9dy3a7goc/master',
    },
    // 通过扩展名选择需要处理的文件
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}
