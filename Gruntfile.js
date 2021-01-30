module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-concurrent");

  grunt.initConfig({
    exec: {
      runnode: {
        cmd: "cd packages/manager && npm run start",
      },
      runweb: {
        cmd: "cd packages/web && npm run dev",
      },
    },
    concurrent: {
      run: ["exec:runnode", "exec:runweb"],
      options: {
        logConcurrentOutput: true,
      },
    },
  });
  // Default task(s).
  grunt.registerTask("default", ["concurrent:run", "concurrent:run"]);
};
