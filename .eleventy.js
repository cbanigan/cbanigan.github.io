module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("videos");
  eleventyConfig.addPassthroughCopy("resume");
  eleventyConfig.addPassthroughCopy("style");
  // Copy HTML files as static (don't process them)
  eleventyConfig.addPassthroughCopy("*.html");
  // Copy GitHub Pages marker
  eleventyConfig.addPassthroughCopy(".nojekyll");

  // Watch for changes
  eleventyConfig.addWatchTarget("style/");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
