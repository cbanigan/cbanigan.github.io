module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("_images");
  eleventyConfig.addPassthroughCopy("_videos");
  eleventyConfig.addPassthroughCopy("_resume");
  eleventyConfig.addPassthroughCopy("style");
  // Copy static HTML files
  eleventyConfig.addPassthroughCopy("index.original.html");
  // Copy GitHub Pages marker
  eleventyConfig.addPassthroughCopy(".nojekyll");

  // Watch for changes
  eleventyConfig.addWatchTarget("style/");

  // Allow clean URLs without file extensions
  eleventyConfig.configureErrorReporting({
    allowMissingExtensions: true,
  });

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
