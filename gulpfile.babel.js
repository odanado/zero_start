/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import mocha from 'gulp-mocha';
import flow from 'gulp-flowtype';
import webpackConfig from './webpack.config.babel';

const paths = {
    allSrcJs: 'src/**/*.js?(x)',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*.js?(x)',
    clientEntryPoint: 'src/client/app.jsx',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
    clientBundle: 'dist/client-bundle.js?(.map)',
    libDir: 'lib',
    distDir: 'dist',
    allLibTests: 'lib/test/**/*.js',
};

gulp.task('lint', () =>
    gulp.src([
        paths.allSrcJs,
        paths.gulpFile,
        paths.webpackFile,
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(flow({ abort: true })),
);

gulp.task('clean', () => del([
    paths.libDir,
    paths.clientBundle,
]));

gulp.task('build', ['lint', 'clean'], () =>
    gulp.src(paths.allSrcJs)
        .pipe(babel())
        .pipe(gulp.dest(paths.libDir)),
);


gulp.task('main', ['test'], () =>
    gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir)),
);

gulp.task('fix-lint', () =>
    gulp.src([
        paths.allSrcJs,
        paths.gulpFile,
    ])
        .pipe(eslint({ fix: true }))
        .pipe(eslint.format())
        .pipe(gulp.dest('.')),
);

gulp.task('test', ['build'], () =>
    gulp.src(paths.allLibTests)
        .pipe(mocha()),
);

gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);
