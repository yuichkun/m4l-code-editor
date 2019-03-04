/* eslint-disable */

// (1) Desired editor features:
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands';
import 'monaco-editor/esm/vs/editor/contrib/find/findController';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController';
import { KeyCode, KeyMod } from 'monaco-editor';

// (2) Desired languages:
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

import App from './App';
import editorConstructorOptions from './constants/editorConstructorOptions';

// @TODO: replace this
self.MonacoEnvironment = {
  getWorker(moduleId, label) {
    if (label === 'json') {
      return new Worker('../node_modules/monaco-editor/esm/vs/language/json/json.worker.js');
    }
    if (label === 'css') {
      return new Worker('../node_modules/monaco-editor/esm/vs/language/css/css.worker.js');
    }
    if (label === 'html') {
      return new Worker('../node_modules/monaco-editor/esm/vs/language/html/html.worker.js');
    }
    if (label === 'typescript' || label === 'javascript') {
      return new Worker('../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js');
    }
    return new Worker('../node_modules/monaco-editor/esm/vs/editor/editor.worker.js');
  },
};

import { initVimMode } from 'monaco-vim';
const statusNode = document.getElementById('status1');
const editor = monaco.editor.create(document.getElementById('editor'), editorConstructorOptions);
initVimMode(editor, statusNode);

editor.addCommand(KeyMod.chord(KeyMod.Shift | KeyCode.Enter), () => {
  const funcStr = editor.getValue();
  App.registerPlugin(funcStr);
});
