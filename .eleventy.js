module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("_images");
  eleventyConfig.addPassthroughCopy("_videos");
  eleventyConfig.addPassthroughCopy("_resume");
  eleventyConfig.addPassthroughCopy("style");
  // Copy GitHub Pages marker
  eleventyConfig.addPassthroughCopy(".nojekyll");

  // Watch for changes
  eleventyConfig.addWatchTarget("style/");

  return {
    dir: {
      input: "pages",
      output: "_site",
      includes: "../_includes",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
