'use strict';
// 采用 gulp 进行样式构建，将packages/d5c-style/src下的 scss 文件转换成 css 文件，输出至packages/d5c-style/src/lib目录下;将packages/d5c-style/src/fonts下的字体文件压缩处理，输出至 packages/d5c-style/src/lib/fonts 目录下。
// 执行 cp-cli packages/d5c-style/lib lib/d5c-style （cp-cli复制） 将构建内容 packages/d5c-style/lib 拷贝到 lib/d5c-style 下。前面 sytle 属性配置的路径文件 lib/d5c-style/index.css 就是这样生成的。
const { series, src, dest } = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

exports.build = series(compile, copyfont);
