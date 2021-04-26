const {appRoot} = require('./config.js');
const path = require('path');

const prettier = require('prettier-eslint');
const jsBeautify = require('js-beautify');
const beautifyHtml = (opt) => (data) => jsBeautify.html(data, opt);
// const beautifyCss = (opt) => (data) => jsBeautify.css(data, opt);
// const beautifyJs = (opt) => (data) => jsBeautify.js(data, opt);

const {read, write, readSync, parseConfig} = require('./utils.js');

const eslintrc = require(path.join(appRoot, '.eslintrc.js'));
const prettierrc = parseConfig(
    readSync(path.join(appRoot, '.prettierrc.json')),
);

const prettifyJs = (file, destination) => {
  return read(file)
      .then((x) =>
        prettier({
          text: x,
          filePath: file,
          eslintConfig: eslintrc,
          prettierOptions: prettierrc,
        }),
      )
      .then(write(destination));
};

const prettifyCss = (file, destination) => {
  return prettifyJs(file, destination);
};

const prettifyHtml = (file, destination) => {
  return read(file)
      .then(
          beautifyHtml({
            indent_size: 2,
            indent_char: ' ',
            indent_with_tabs: false,
            eol: '\n',
            end_with_newline: false,
            preserve_newlines: true,
            max_preserve_newlines: 2,
            indent_inner_html: false,
            brace_style: 'collapse',
            indent_scripts: 'normal',
            wrap_line_length: 80,
            wrap_attributes: 'aligned-multiple',
            wrap_attributes_indent_size: 'indent-size',
            inline: [],
            unformatted: [],
            content_unformatted: [],
            extra_liners: [],
          }),
      )
      .then(write(destination));
};

module.exports = {
  prettifyJs,
  prettifyCss,
  prettifyHtml,
};
