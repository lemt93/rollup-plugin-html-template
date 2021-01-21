'use strict';

var fs = require('fs');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

function rollupPluginHtmlTemplate(options = {}) {
  let chunkIds = [];
  const defaultOptions = {
    input: 'index.template.html',
    output: 'index.html',
    cssBundle: 'bundle.css'
  };

  // If a token is present > 1 time,
  // Only replace the first matched token
  const defaultReplaceTokens = {
    HEAD: '%svelte.head%',
    BODY: '%svelte.body%'
  };

  const {
    input,
    output,
    cssBundle
  } = {
    ...defaultOptions,
    ...options
  };

  const templateFile = path__default['default'].join(process.cwd(), input);

  const getTemplateString = () => fs__default['default'].readFileSync(templateFile, 'utf-8');

  return {
    name: 'html-template',
    buildStart(options) {
      this.addWatchFile(templateFile);

      // Support multi entries
      chunkIds.length = 0;
      options.input
          .filter(chunk => chunk.endsWith('.js'))
          .forEach(chunk => chunkIds.push(this.emitFile({
            type: 'chunk',
            id: chunk
          })));
    },
    generateBundle(options) {
      // TODO: get emitted chunks instead of hard-code bundle
      const head = `<link rel='stylesheet' href='${cssBundle}'>`;
      const body = chunkIds
          .reduce(
              (result, chunkId) => `${result}\n\r  <script defer src='${this.getFileName(chunkId)}'></script>`,
              ''
          );

      this.emitFile({
        type: 'asset',
        fileName: output,
        source: getTemplateString()
            .replace(defaultReplaceTokens.HEAD, head)
            .replace(defaultReplaceTokens.BODY, body)
      });
    }
  }
}

module.exports = rollupPluginHtmlTemplate;
