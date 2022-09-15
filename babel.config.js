module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/sass/main.sass";
        `
      }
    }
  }
}
