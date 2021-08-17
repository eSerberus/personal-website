const gulp = require("gulp"),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  minifyCSS = require("gulp-clean-css"),
  clean = require("gulp-clean"),
  autoprefixer = require("gulp-autoprefixer"),
  imageMin = require("gulp-imagemin"),
  browserSync = require("browser-sync").create();

const path = {
  src: {
    css: "src/css/**/*.css",
    js: "src/js/*.js",
    img: "src/img/**/*",
    pdf: "src/pdf/*",
  },
  dist: {
    self: "dist/",
    css: "dist/css/",
    js: "dist/js/",
    img: "dist/img",
    pdf: "dist/pdf",
  },
  html: {
    html: "./*.html",
  },
};

//Image Builder
const imageBuilder = () =>
  gulp.src(path.src.img).pipe(imageMin()).pipe(gulp.dest(path.dist.img));

// Css Builder
const cssBuilder = () =>
  gulp
    .src(path.src.css)
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.dist.css));

const pdfBuilder = () => gulp.src(path.src.pdf).pipe(gulp.dest(path.dist.pdf));

// Clean dist folder
const cleanDist = () =>
  gulp.src(path.dist.self, { allowEmpty: true }).pipe(clean());

// Js Builder
const jsBuilder = () =>
  gulp
    .src(path.src.js)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js));

// Watcher
const watcher = () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch(path.html.html).on("change", browserSync.reload);
  gulp.watch(path.src.css, cssBuilder).on("change", browserSync.reload);
  gulp.watch(path.src.js, jsBuilder).on("change", browserSync.reload);
  gulp.watch(path.src.img, imageBuilder).on("change", browserSync.reload);
};

//TODO ===== TASK Build =====
gulp.task(
  "build",
  gulp.series(cleanDist, cssBuilder, jsBuilder, imageBuilder, pdfBuilder)
);

//TODO ===== TASK Dev =====
gulp.task("dev", gulp.series(watcher));

//TODO ===== TASK Default =======
gulp.task(
  "default",
  gulp.series(
    cleanDist,
    cssBuilder,
    jsBuilder,
    imageBuilder,
    pdfBuilder,
    watcher
  )
);
