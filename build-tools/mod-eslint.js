const CLIEngine = require('eslint').CLIEngine;
const path = require('path');
const {appRoot} = require('./config.js');
const {readSync, parseConfig, length} = require('./utils.js');

const eslintrc = require(path.join(appRoot, '.eslintrc.js'));

const esLintFiles = (fileNames) => {
  return new Promise((resolve, reject) => {
    if (length(fileNames) === 0) {
      resolve();
      return;
    }
    const cli = new CLIEngine({
      useEslintrc: false,
      baseConfig: eslintrc,
    });
    const formatter = cli.getFormatter();
    const report = cli.executeOnFiles(fileNames);

    const messages = report.results.filter((x) => {
      return true;
    });

    if (report.errorCount === 0 && report.warningCount === 0) {
      resolve();
    } else {
      reject(formatter(messages));
    }

    // return {
    //   output: formatter(messages),
    //   results: messages,
    //   errorCount: report.errorCount,
    //   warningCount: report.warningCount,
    //   passed: report.errorCount === 0 && report.warningCount === 0
    // };
  });
};

module.exports = {
  esLintFiles,
};
