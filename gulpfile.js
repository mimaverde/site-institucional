//Importa os módulos do GULP
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	cssmin = require('gulp-cssmin'),
  htmlReplace = require('gulp-html-replace');
	browserSync = require('browser-sync'),
	jshint = require('gulp-jshint'),
	jshintStylish = require('jshint-stylish'),
	csslint = require('gulp-csslint'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename');
	autoprefixer = require('gulp-autoprefixer');

//Cria um servidor para rodar o site
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'src'
		}
	});

	//Verifica se existem erros no js
    gulp.watch('src/js/**/*.js').on('change', function(event) {
        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish));
    });

    //Verificar se existem erros no css
    gulp.watch('src/css/**/*.css').on('change', function(event) {
        gulp.src(event.path)
            .pipe(csslint())
            .pipe(csslint.reporter());
    });
});

//Faz o reload da página na alteração dos arquivos
gulp.task('bs-reload', function () {
  browserSync.reload();
});

//Percorre todas as funções
gulp.task('default', ['browser-sync'], function(){
	//Inicia as funções
	gulp.start('html', 'images', 'styles', 'scripts');

	//Verifica alterações no site
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('*.html', ['bs-reload']);
})

gulp.task('html', function(){
  gulp.src('src/**/*.html')
    .pipe(htmlReplace({
          'css': 'styles/styles.min.css',
          'js': 'scripts/script.min.js'
    }))
    .pipe(gulp.dest('dist/'));
});

//Minifica as imagens
gulp.task('images', function(){
	//Fluxo de origem passando pelo plugin utilizando o pipe saindo na pasta de destino
	gulp.src('src/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
});

//Compila, concatena e minifica os arquivos CSS
gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}))
});

//Concatena e minifica os arquivos JS
gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(browserSync.reload({stream:true}))
});