var gulp = require('gulp');
var gutil = require('gulp-util');
var lr = require('tiny-lr');
var http = require('http');
var path = require('path');
var ecstatic = require('ecstatic');
var tlr = lr();
var livereload = function (evt, filepath) {
    tlr.changed({
        body: {
            files: path.relative(__dirname, filepath)
        }
    });
};

gulp.task('default', function () {
    http.createServer(ecstatic({
        root: __dirname
    })).listen(8080);
    gutil.log(gutil.colors.blue('HTTP server listening on port 8080'));
    tlr.listen(35729);
    gutil.log(gutil.colors.blue('Livereload server listening on port 35729'));
    gulp.watch('index.html')._watcher.on('all', livereload);
});
