var marked = require('marked')
var hl = require('highlight.js')

marked.setOptions({
  highlight: function (code, lang) {
    try {
      return highlight(code, lang)
    } catch (e) {
      console.error(e)
    }
  }
})

function highlight (code, lang) {
  var out = lang ? hl.highlight(lang, code) : hl.highlightAuto(code)
  return out.value
}

module.exports = function parse (markdown, opts) {
  opts = opts || {}
  opts.separator = opts.separator ? opts.separator : '\n---\n'
  var regex = new RegExp(opts.separator, 'g')

  var matches, content
  var stack = []
  var lastIndex = 0

  while (matches = regex.exec(markdown)) {
    content = markdown.substring(lastIndex, matches.index)
    lastIndex = regex.lastIndex
    stack.push(content)
  }

  var final = markdown.substring(lastIndex)
  stack.push(final)

  var slides = stack.map(function (d) {
    return '<section>\n' + marked(d) + '</section>\n'
  })

  if (!markdown) return ''
  return slides.join('\n')
}