const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const { src, dest, series } = require('gulp')

function build(cb) {
  src('../src/styles/index.scss')
    .pipe(sass())
    .pipe(autoprefixer({ Browserslist: ['last 2 versions', 'ie > 8'] }))
    .pipe(cleanCSS())
    .pipe(rename('viz.css'))
    .pipe(dest('../dist/css'))
  cb()
}

exports.default = series(build) 