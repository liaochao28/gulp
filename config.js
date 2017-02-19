
function asd() { 

    var basePath = './',

        srcPath = 'src/',
        distPath = 'dist/',

        cssPath = basePath + distPath + 'css/',
        minCssPath = basePath + distPath + 'mincss/',
        jsPath = basePath + distPath + 'js/',
        imagePath = basePath + distPath + 'image/',

        sassFiles = basePath + srcPath + 'sass/*.scss',
        jsFiles = basePath + srcPath + 'js/*.js';
        
        htmlFiles = basePath + '**/*.html';

    return {
        baseDir: basePath,

        jsPath: jsPath,
        imagePath: imagePath,
        cssPath: cssPath,
        minCssPath: minCssPath,

        sassFiles: sassFiles,
        jsFiles: jsFiles,
        htmlFiles: htmlFiles
    }
}

module.exports = asd();