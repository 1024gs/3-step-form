const {is, yellow, length, promiseSerial, either} = require('./utils.js');
const {esLintFiles} = require('./mod-eslint.js');
const {tscFiles, runTscOnFiles} = require('./mod-typescript.js');

const staged = process.argv.slice(2);

console.log('Running pre-commit task...');

if (length(staged) === 0) {
  console.log(
      yellow('THIS TASK REQUIRES THE STAGED FILES AS SPACE-DELIMITED PARAMETERS'),
  );
  console.log('');
  console.log('  Example: node task-pre-commit.js file-1.js [file-2.js]');
  process.exit(1);
}

const stagedTs = staged.filter(either([is('.ts'), is('.tsx')]));

if (length(stagedTs) === 0) {
  console.log('No staged ts files.');
  process.exit(0);
}

/* ----------- ESLint ----------- */
const esLint = () => {
  console.log('Linting all files...');

  return esLintFiles(stagedTs)
      .then(() => {
        console.log('Lint passed.');
      })
      .catch((output) => {
        console.log(output);
        console.log('Lint failed.');
        process.exit(1);
      });
};

/* ----------- Typescript ----------- */
const tsCheckTypes = () => {
  console.log('Type checking...');

  /*
   * Note that the function name starts with `run`,
   * that is because it logs the output directly to the console
   * Todo: review typescript nodejs API and
   * replace `runTscOnFiles` with `tscFiles` (like esLintFiles)
   */
  return runTscOnFiles(stagedTs)
      .then(() => {
        console.log('Typescript passed.');
      })
      .catch((output) => {
      // console.log(output);
        console.log('Typescript failed.');
        process.exit(1);
      });
};

promiseSerial(esLint, tsCheckTypes)();
