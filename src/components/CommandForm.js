import React, { useState } from 'react';

const CommandForm = ({ onSubmit, isRunning }) => {
  const [command, setCommand] = useState('');  // the entered command
  const [args, setArgs] = useState('');  // the entered arguments for the command

  // handle changes to the command input
  const handleCommandChange = (event) => {
    setCommand(event.target.value);
  };

  // handle changes to the arguments input
  const handleArgsChange = (event) => {
    setArgs(event.target.value);
  };

  // handle form submission
  const handleSubmit = (event) => {
    console.log("hi");
    event.preventDefault();

    // split the arguments string on spaces and trim any leading or trailing whitespace
    const argsArray = args.split(' ').map((arg) => arg.trim());

    // call the onSubmit prop with the command and arguments
    onSubmit(command, argsArray);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="command">Command:</label>
      <input
        type="text"
        id="command"
        value={command}
        onChange={handleCommandChange}
        disabled={isRunning}
      />
      <br />
      <label htmlFor="args">Arguments:</label>
      <input
        type="text"
        id="args"
        value={args}
        onChange={handleArgsChange}
        disabled={isRunning}
      />
      <br />
      <button type="submit" disabled={isRunning}>
        Run Command
      </button>
    </form>
  );
};

export default CommandForm;

