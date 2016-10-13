var fs = require('fs')
var minislides = require('./index')

var markdown = fs.readFileSync('example.md').toString()
var slides = minislides(markdown, {separator: '\n---\n'})
console.log(slides)