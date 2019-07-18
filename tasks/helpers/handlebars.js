const fs = require('fs')
const Handlebars = require('handlebars')

const {
  HTML_INPUT,
  HTML_OUTPUT,
  CSS_PATH,
  JS_PATH
} = process.env

const html = fs.readFileSync(HTML_INPUT, 'utf-8')
const template = Handlebars.compile(html)
const templateData = {
  CSS_PATH,
  JS_PATH
}
const output = template(templateData)

fs.writeFileSync(HTML_OUTPUT, output)
