module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', './**/*.js']
		},
		watch: {
			files: ['./**/*.js'],
			tasks: ['jshint']
		}
	});
};