//Importa os módulos do gulp
var gulp = require('gulp'),
	imagemin = require('gulp-imagemin');

//Fluxo de origem passando pelo plugin utilizando o pipe saindo na pasta de destino
gulp.src('src/images')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images'));


