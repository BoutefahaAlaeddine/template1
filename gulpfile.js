var gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefix = require("gulp-autoprefixer"),
  sass = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  livereload = require("gulp-livereload"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  minify = require("gulp-minify"),
  notify = require("gulp-notify"),
  zip = require("gulp-zip"),
  ftp = require("vinyl-ftp");

//your First Task
// gulp.task("Dz", async function () {
//   console.log("Gratz For Your First Task");
// });

//html

function html() {
  return gulp
    .src("stage/html/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
}

//css
function css() {
  return gulp
    .src(["stage/css/**/*.css", "stage/css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(prefix())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
}

//js
function js() {
  return gulp
    .src("stage/js/*.js")
    .pipe(concat("main.js"))
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
}

//compress Files
function compress() {
  return gulp
    .src("dist/**/*.*")
    .pipe(zip("website.zip"))
    .pipe(gulp.dest("."))
}

//upload Design With FTP
// function deploy() {
//   var conn = ftp.create({
//     host: "elzero.net",
//     user: "",
//     password: "",
//     parallel: 10,
//   });

//   return gulp
//     .src(["dist/**/*.*"], { base: ".", buffer: false })
//     .pipe(conn.newer("/public_html"))
//     .pipe(conn.dest("/public_html"))
//     .pipe(livereload());
// }

//watch Task
exports.default = function () {
  require("./server.js");
  livereload.listen();
  gulp.watch(["stage/html/**/*.pug"], html);
  gulp.watch(["stage/css/**/*.css", "stage/css/**/*.scss"], css);
  gulp.watch(["stage/js/*.js"], js);
  // gulp.watch(["dist/**/*.*"], compress);
  // gulp.watch(["dist/**/*.*"], deploy);
};
