import { execSync } from 'child_process';
import { join } from 'path';

async function build() {
  console.log('[Server] Installing dependencies');
  const serverPath = join(__dirname, '..');
  execSync('npm install', {
    cwd: serverPath,
  });

  console.log('[Client] Installing dependencies');
  const clientPath = join(__dirname, '..', 'client');
  execSync('npm install', {
    cwd: clientPath,
  });
  console.log('Bootstrap success');
}

build();
