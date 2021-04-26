const path = require('path');
const ts = require('typescript');
const {appRoot} = require('./config.js');
const {
  readSync,
  parseConfig,
  read,
  prop,
  write,
  merge,
  cyan,
  yellow,
  grey,
  length,
  undef,
} = require('./utils.js');

const extension = process.platform === 'win32' ? '.cmd' : '';
const tsconfig = parseConfig(readSync(path.join(appRoot, 'tsconfig.json')));

const transpileTs = (fileName) => {
  return (content) =>
    Promise.resolve(ts.transpileModule(content, tsconfig)).then(
        prop('outputText'),
    );
};

const transpileTsAndWrite = (fileName, destination) => {
  return read(fileName)
      .then((content) => ts.transpileModule(content, tsconfig))
      .then(prop('outputText'))
      .then(write(destination));
};

/*
 * TODO: Keep in mind that this is not yet a stable API
 * https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
 */
const tscFiles = (fileNames) => {
  return new Promise((resolve, reject) => {
    if (length(fileNames) === 0) {
      resolve();
      return;
    }
    console.log(grey('Emit output has been disabled'));
    const program = ts.createProgram(
        fileNames,
        merge({noEmit: true}, tsconfig.compilerOptions),
    );
    const emitResult = program.emit();
    // console.log({emitResult});

    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    // console.log({allDiagnostics});

    const formatter = (diagnostics) => {
      let r = '';
      diagnostics.forEach((x) => {
        if (x.file) {
          const {line, character} = x.file.getLineAndCharacterOfPosition(
              x.start,
          );
          const message = ts.flattenDiagnosticMessageText(x.messageText, '\n');
          r += `${cyan(x.file.fileName)} ${yellow(
              `(${line + 1},${character + 1})`,
          )} - ${grey('TS' + x.code)}: ${message}`;
          r += '\n';
        } else {
          r += `${ts.flattenDiagnosticMessageText(x.messageText, '\n')}`;
          r += '\n';
        }
      });

      return r;
    };

    /*
     * Typescript doesn't provide a formatter fn yet. So we will try to use esLint's one
     * We just need to transform ts report into esLint's format
     */
    const esFormatter = (messages) => {
      const CLIEngine = require('eslint').CLIEngine;
      const cli = new CLIEngine({useEslintrc: false});
      return cli.getFormatter()(messages);
    };

    // todo: it isn't complete
    const mapSeverity = (category) => {
      if (category === 1) return 2;
      return 1;
    };

    const countBy = (pred) => (xs) =>
      xs.reduce((a, x) => (pred(x) ? a + 1 : a), 0);
    const errorCount = countBy((x) => x.severity === 2);
    const warningCount = countBy((x) => x.severity !== 2);

    const mapMessage = (x) => {
      const {line, character} = x.file.getLineAndCharacterOfPosition(x.start);
      return {
        ruleId: grey('TS' + x.code),
        severity: mapSeverity(x.category),
        message: x.messageText,
        line: line,
        column: character,
      };
    };

    // Convert the ts report into esLint's format
    const tsToEs = (messages) => {
      // group messages by file name
      const map = {};
      let i = 0;
      while (i < length(messages)) {
        if (undef(map[messages[i].file.fileName])) {
          map[messages[i].file.fileName] = [];
        }
        map[messages[i].file.fileName].push(mapMessage(messages[i]));
        i += 1;
      }

      // build the report
      let totalErrors = 0;
      let totalWarnings = 0;
      const results = [];
      for (const prop in map) {
        const errors = errorCount(map[prop]);
        const warnings = warningCount(map[prop]);
        results.push({
          filePath: prop,
          messages: map[prop],
          errorCount: errors,
          warningCount: warnings,
        });

        totalErrors += errors;
        totalWarnings += warnings;
      }

      return {
        results: results,
        errorCount: totalErrors,
        warningCount: totalWarnings,
      };
    };

    const report = tsToEs(allDiagnostics);

    if (report.errorCount === 0 && report.warningCount === 0) {
      resolve();
    } else {
      reject(esFormatter(report.results));
    }

    // return {
    //   output: formatter(allDiagnostics),
    //   results: allDiagnostics,
    //   errorCount: errorCount,
    //   warningCount: warningCount,
    //   passed: errorCount === 0 && warningCount === 0,
    // };
  });
};

const tscOptions = (obj) => {
  const pairs = [];
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      pairs.push('--' + prop);
      pairs.push(obj[prop]);
    }
  }
  return pairs;
};

const runTscOnFiles = (fileNames) => {
  return new Promise((resolve, reject) => {
    if (length(fileNames) === 0) {
      resolve();
      return;
    }
    console.log(grey('Emit output has been disabled'));
    const compilerOptions = merge({noEmit: true}, tsconfig.compilerOptions);
    const cmd = path.join(appRoot, 'node_modules', '.bin', 'tsc' + extension);

    const {spawnSync} = require('child_process');
    // stdio: 'inherit' - Allow colors to pass through
    const result = spawnSync(
        cmd,
        [...tscOptions(compilerOptions), ...fileNames],
        {stdio: 'inherit', cwd: appRoot},
    );

    if (result.status === 0) {
      resolve();
    } else {
      reject();
    }
  });
};

module.exports = {
  transpileTs,
  transpileTsAndWrite,
  runTscOnFiles,
  tscFiles,
};
