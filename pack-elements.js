const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

    const files = [
        './dist/runtime.js',
        './dist/polyfills.js',
        './dist/scripts.js',
        './dist/main.js'
    ]

    await fs.ensureDir('dist/elements')

    await concat(files, 'dist/elements/kros-custom-elements.js')
    console.info('Elements created successfully!')

})()
