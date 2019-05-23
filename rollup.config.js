import json from 'rollup-plugin-json';

export default {
    input: 'src/rollup/main.js',
    output: {
        file: 'bound.js',
        format: 'cjs'
    },
    plugins: [ json() ]
}