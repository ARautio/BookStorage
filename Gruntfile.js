module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-concurrent");

  grunt.initConfig({
    exec: {
      installnode: {
        cmd: "cd packages/manager && npm install",
      },
      installweb: {
        cmd: "cd packages/web && npm install",
      },
      buildweb: {
        cmd: "cd packages/web && npm run build",
      },
      runnode: {
        cmd: "cd packages/manager && npm run start",
      },
      devweb: {
        cmd: "cd packages/web && npm run dev",
      },
      runweb: {
        cmd: "cd packages/web && npm run start",
      },
    },
    concurrent: {
      install: ["exec:installnode", "exec:installweb"],
      run: ["exec:runnode", "exec:runweb"],
      dev: ["exec:runnode", "exec:devweb"],
      build: ["exec:buildweb"],
      options: {
        logConcurrentOutput: true,
      },
    },
  });
  // Default task(s).
  grunt.registerTask("default", ["concurrent:run"]);
  grunt.registerTask("dev", ["concurrent:dev"]);
  grunt.registerTask("build", ["concurrent:install", "concurrent:build"]);
};
