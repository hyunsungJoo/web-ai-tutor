const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json"], // 확장자 명시
    },
  },
});
