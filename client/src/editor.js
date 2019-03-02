// (1) Desired editor features:
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js';
import { KeyCode, KeyMod } from 'monaco-editor';

// (2) Desired languages:
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';



self.MonacoEnvironment = {
	getWorker: function (moduleId, label) {
		if (label === 'json') {
			return new Worker('../node_modules/monaco-editor/esm/vs/language/json/json.worker.js')
		}
		if (label === 'css') {
			return new Worker('../node_modules/monaco-editor/esm/vs/language/css/css.worker.js')
		}
		if (label === 'html') {
			return new Worker('../node_modules/monaco-editor/esm/vs/language/html/html.worker.js')
		}
		if (label === 'typescript' || label === 'javascript') {
			return new Worker('../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js')
		}
		return new Worker('../node_modules/monaco-editor/esm/vs/editor/editor.worker.js')
	}
}

const transpose = interval => ([sys, pitch, velocity]) => ([sys, pitch+interval, velocity]);
const withDelay = delay => midievent => ({ midievent, delay});
const isNoteOff = ([sys, pitch, velocity]) => velocity === 0; 

const initialEditorArea =
`
window.plugin = function(midievent) {
	const dryNote = withDelay(0)(midievent);
	const notes = [dryNote];

	for(let i = 0; i < 20; i++){
		const rndInterval = Math.floor(Math.random() * 10) - 5;
		const newNote = withDelay(0)(transpose(rndInterval)(midievent));
		notes.push(newNote);
	}

	return notes;
}
`;

const editor = monaco.editor.create(document.getElementById('editor'), {
	value: initialEditorArea,
	language: 'javascript',
	theme: 'vs-dark',
	fontSize: window.innerWidth / 50,
	lineNumbers: 'off',
	automaticLayout: true,
	scrollbar: {
		vertical: 'hidden',
		horizontal: 'hidden',
	},
	minimap: {
		enabled: false,
	},
});

editor.addCommand(KeyMod.chord(KeyMod.Shift | KeyCode.Enter), () => {
	eval(editor.getValue());
});


if (window.max) {
	window.max.bindInlet('midievent', function (...midievent) {
		if (plugin) {
			if (isNoteOff(midievent)) {
				window.max.outlet(JSON.stringify({ midievent, delay: 0 }));
				return;
			}
			const commands = plugin(midievent);
			commands.forEach(command => window.max.outlet(JSON.stringify(command)));
		} else {
			alert('no plugin');
		}
	});
}
