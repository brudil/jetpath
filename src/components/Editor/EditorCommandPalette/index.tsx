import React from 'react';
// import Fuse from 'fuse.js';

import style from './EditorCommandPalette.css';
//
// const baseCommands = [
//   {
//     command: 'insert',
//     arguments: [
//       { name: 'placement', choices: ['above', 'below', 'bottom', 'top'] },
//       { name: 'element', choices: ['item', 'text', 'image', 'list', 'freeform', 'quote', 'canvas'] },
//     ],
//   },
//   {
//     command: 'setsubtype',
//     arguments: [
//       { name: 'subtype', choices: ['article', 'canvas'] }
//     ]
//   },
//   {
//     command: 'state',
//     arguments: [
//       { name: 'state', choices: ['stub', 'draft', 'final'] },
//     ]
//   },
//   {
//     command: 'publish',
//   },
//   {
//     command: 'save',
//   },
//   {
//     command: 'preview',
//   },
//   {
//     command: 'copypreview',
//   },
//   {
//     command: 'compose',
//   },
//   {
//     command: 'remove',
//   },
//   {
//     command: 'metadata',
//   },
// ];
//
// const fuse = new Fuse(baseCommands, { keys: ['command', 'arguments.choices']});

function EditorCommandPalette() {
  return (
    <div className={style.root}>
      <input className={style.input} type="text" autoFocus />
    </div>
  );
}

export default EditorCommandPalette;
