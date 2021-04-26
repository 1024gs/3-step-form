const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const {copy, scanDir} = require('./utils.js');
const resolve = (rel) => path.resolve(__dirname, rel);
const mklink = (link, target) => {
  fs.stat(link, function(err, stat) {
    if (err && err.code == 'ENOENT') {
      if (/^win/.test(process.platform)) {
        console.log(`MKLINK /J "${link}" "${target}"`);
        cp.exec(`MKLINK /J "${link}" "${target}"`);
      } else {
        console.log(`ln -s ${target} ${link}`);
        cp.exec(`ln -s ${target} ${link}`);
      }
    }
  });
};
const dirList = (dir) =>
  fs
      .readdirSync(dir)
      .reduce(
          (a, x) =>
        fs.statSync(path.join(dir, x)).isDirectory() ?
          a.concat(path.join(dir, x)).concat(dirList(path.join(dir, x))) :
          a,
          [],
      );
const removeIfNotLink = (path) => {
  if (!fs.existsSync(path)) {
    return;
  }

  if (fs.lstatSync(path).isSymbolicLink()) {
    return;
  }

  scanDir(path).forEach((x) => {
    fs.unlinkSync(x);
  });

  dirList(path).forEach((x) => {
    fs.rmdirSync(x);
  });

  fs.rmdirSync(path);
};

const sourcePreCommit = path.resolve(__dirname, 'git-hook-pre-commit');
const targetPreCommit = path.resolve(__dirname, '../', '.git/hooks/pre-commit');
copy(sourcePreCommit, targetPreCommit)
    .then(() => {
      console.log('copy build-tools/git-hook-pre-commit .git/hooks/pre-commit');
      console.log('chmod 0o755 .git/hooks/pre-commit');
      fs.chmod(targetPreCommit, 0o755, () => {});
    })
    .catch((err) => {
      throw err;
    });

removeIfNotLink(resolve('../node_modules/react'));
removeIfNotLink(resolve('../node_modules/react-dom'));
removeIfNotLink(resolve('../node_modules/react-is'));

mklink(resolve('../node_modules/react'), resolve('../vendors/react'));
mklink(resolve('../node_modules/react-dom'), resolve('../vendors/react-dom'));
mklink(resolve('../node_modules/react-is'), resolve('../vendors/react-is'));
