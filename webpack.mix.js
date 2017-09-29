let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

 mix.options({
     processCssUrls: false,
     postCss: [
         require('autoprefixer')({
             browsers: [
                 '>= 1%',
                 'ie 9'
             ],
             cascade: false,
             remove: false
         })
     ]
 });

mix
    .sass('src/sass/app.scss', 'public/css')
    .js('src/js/app.js', 'public/js')
    .setPublicPath('.')
;