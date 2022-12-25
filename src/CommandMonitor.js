const { spawn } = require('child_process');

// The command to execute
const command = 'mycommand';

// The command's arguments
const args = ['arg1', 'arg2', 'arg3'];

// Spawn the child process
const child = spawn(command, args);

// Log the command's output in real-time
child.stdout.on('data', data => {
  console.log(data.toString());
});

// Handle any errors that occur
child.on('error', err => {
  console.error(err);
});

// When the command finishes executing, log the exit code
child.on('exit', code => {
  console.log(`Child process exited with code ${code}`);
});

