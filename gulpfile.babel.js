/**
 * Created by haven on 16/8/24.
 */


'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import es2015 from 'babel-preset-es2015'
import webpack from 'gulp-webpack'

const dirs = {
	src: 'stage2/task25/bao/',
	dest: 'stage2/task25/bao/dest/'
}

const es6Path = {
	src: `${dirs.src}` + '*.js',
	dest: `${dirs.dest}`
}

gulp.task('babel', ()=> {
	gulp.src(es6Path.src)
		.pipe(babel({presets: [es2015]}))
		.pipe(gulp.dest(es6Path.dest))
		.pipe(webpack({
				output: {
					filename: "bundle.js"
				},
				stats: {
					color: true
				}
			}
		))
		.pipe(gulp.dest(es6Path.dest))
})

gulp.task('watch', ()=> {
	gulp.watch(es6Path.src, ['babel'])
})
