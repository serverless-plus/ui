import { execSync } from 'child_process';
import { join } from 'path';
import ora from 'ora';
import shell from 'shelljs';

async function build() {
  const bar = ora().start('Building');
  // 1. build server
  const serverDist = join(__dirname, '..', 'dist');
  const buildInfo = join(__dirname, '..', 'tsconfig.tsbuildinfo');
  bar.info('Building server');
  shell.rm('-rf', serverDist);
  shell.rm('-rf', buildInfo);
  execSync('npm run compile', {
    cwd: process.cwd(),
  });

  // 2. build client
  bar.info('Building client');
  const clientPath = join(__dirname, '..', 'client');
  execSync('npm run build', {
    cwd: clientPath,
  });
  shell.cp('-R', 'client/build', 'dist/views');

  bar.succeed('Build success');
}

build();
