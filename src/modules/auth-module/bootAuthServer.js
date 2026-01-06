const { spawn } = require('child_process');
const path = require('path');

const cwd = __dirname;
const script = path.join(cwd, 'app.py');

function trySpawn(cmd) {
  const p = spawn(cmd, [script], { cwd, stdio: 'inherit' });
  p.on('error', (err) => {
    if (cmd === 'python') trySpawn('python3');
    else {
      console.error('Failed to start auth server. Please run: python app.py');
      process.exit(1);
    }
  });
}

trySpawn('python');
