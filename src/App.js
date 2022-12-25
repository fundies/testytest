import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import CommandForm from './components/CommandForm.js';
import OutputPanel from './components/OutputPanel.js';

const App = () => {
  const [output, setOutput] = useState('');  // the output of the command
  const [error, setError] = useState('');  // any errors that occurred
  const [isRunning, setIsRunning] = useState(false);  // whether the command is currently running

  // set up a socket.io client
  const socket = io('http://localhost:3000');

  // listen for 'command-output' events and append the output to the state
  socket.on('command-output', (data) => {
    // create a new TextDecoder instance
    const decoder = new TextDecoder();
    // convert the data to a string
    const output = decoder.decode(data);
    // update the output in the user interface
    setOutput((prevOutput) => prevOutput + output);
  });

  // listen for 'command-error' events and update the error state
  socket.on('command-error', (data) => {
    setError(data);
  });

  // listen for 'command-complete' events and update the isRunning state
  socket.on('command-complete', () => {
    setIsRunning(false);
  });

  // send a command to the server when the form is submitted
  const handleSubmit = (command, args) => {
    setOutput('');  // clear the output
    setError('');  // clear any previous errors
    setIsRunning(true);  // set the isRunning state to true

    // send the command to the server using socket.io
    socket.emit('run-command', { command, args });
  };

  return (
    <div className="app">
      <CommandForm onSubmit={handleSubmit} isRunning={isRunning} />
      <OutputPanel output={output} error={error} />
    </div>
  );
};

export default App;

