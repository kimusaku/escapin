#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import updateNotifier from 'update-notifier';
import { Escapin } from '.';
import pkg from '../package.json';

function dir(val: string): string {
  return path.resolve(val);
}

function main() {
  const notifier = updateNotifier({ pkg });
  if (notifier.update && notifier.update.latest !== pkg.version) {
    notifier.notify({ defer: false });
  }

  program.version(pkg.version);

  program
    .description('Transpile source code')
    .option('-d, --dir <dir>', 'working directory (default: .)', dir, process.cwd())
    .action(doTranspileProcess)
    .on('--help', function() {
      console.log('escapin [-d <dir>]');
    });

  program.parse(process.argv);
}

main();

async function doTranspileProcess(options: { dir: string }) {
  const { dir } = options;

  console.log(`working directory is ${dir}`);

  const escapin = new Escapin(dir);

  try {
    await escapin.transpile();
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
}
