'use strict';

const gulp = require('gulp');
const tailwindcss = require('tailwindcss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const uncss = require('postcss-uncss');
const svgSprite = require('gulp-svg-sprite');

gulp.task('scss:dev', ()=> {
  return gulp.src('_scss/tailwind.css')
    .pipe(postcss([
      tailwindcss('tailwind.js'),
      autoprefixer(),
    ]))
    .pipe(gulp.dest('./_includes/css'));
});

gulp.task('scss', ()=> {
	return gulp.src('_scss/tailwind.css')
		.pipe(postcss([
			tailwindcss('tailwind.js'),
            autoprefixer(),
            cssnano(),
            uncss({
                html: ['./_site/index.html', "./_site/blog/**/*.html"],
            })
        ]))
		.pipe(gulp.dest('./_includes/css'));
});

gulp.task('svg', () => {
	gulp.src('./assets/svg/*.svg')
		.pipe(svgSprite({
			shape: {
				dimension: {
					maxWidth : 20,
					maxHeight: 20
				},
				spacing : {
					padding: 10
				},
				dest: 'svg'
			},
			mode : {
				symbol: true
			}
		}))
		.pipe(gulp.dest('./assets/svg'));
});

gulp.task('develop', ['scss:dev']);
gulp.task('default', ['svg', 'scss']);
