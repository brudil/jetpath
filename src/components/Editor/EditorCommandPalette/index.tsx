import React from 'react';
import Fuse from 'fuse.js';

import style from './EditorCommandPalette.css';
import {compose, withState} from "recompose";

interface CommandArgument {
  name: string,
  choices: Array<string>,
}

interface Command {
  command: string,
  arguments?: Array<CommandArgument>
}

const baseCommands: Array<Command> = [
  {
    command: 'insert',
    arguments: [
      { name: 'element', choices: ['item', 'text', 'image', 'list', 'freeform', 'quote', 'canvas'] },
      { name: 'placement', choices: ['above', 'below', 'bottom', 'top'] },
    ],
  },
  {
    command: 'setsubtype',
    arguments: [
      { name: 'subtype', choices: ['article', 'canvas'] }
    ]
  },
  {
    command: 'state',
    arguments: [
      { name: 'state', choices: ['stub', 'draft', 'final'] },
    ]
  },
  {
    command: 'publish',
  },
  {
    command: 'save',
  },
  {
    command: 'preview',
  },
  {
    command: 'copypreview',
  },
  {
    command: 'compose',
  },
  {
    command: 'remove',
  },
  {
    command: 'metadata',
  },
];

function generateLabels(_label: string, _args: Array<CommandArgument>): Command {
  return baseCommands[0];
}

let allCommands: Array<Command> = [];

baseCommands.forEach(baseCommand => {
  if (baseCommand.hasOwnProperty('arguments') && baseCommand.arguments) {
    // console.log(baseCommand.command, baseCommand.arguments.map(arg => arg.choices.length).reduce((p, o) => p * o, 1));
    allCommands = allCommands.concat(generateLabels(baseCommand.command, baseCommand.arguments));
    baseCommand.arguments.forEach((arg: CommandArgument) => {
      arg.choices.forEach(argOption => console.log(baseCommand.command, argOption));
    })
  } else {
    allCommands.push({ command: baseCommand.command });
  }
});

const fuse = new Fuse(baseCommands, { keys: ['command'] });

interface IProps {
  commandQuery: string,
  updateQuery: (value: string) => void,
  children?: any,
}

function EditorCommandPalette(props: IProps) {
  return (
    <div className={style.root}>
      {props.commandQuery !== '' ? <ul>
        {fuse.search(props.commandQuery).map((command: Command) => <li>{command.command}</li>)}
      </ul> : null}
      <input
        className={style.input}
        autoFocus
        value={props.commandQuery}
        onChange={(e) => props.updateQuery(e.currentTarget.value)}
      />
    </div>
  );
}

export default compose(
  withState('commandQuery', 'updateQuery', '')
)(EditorCommandPalette);
