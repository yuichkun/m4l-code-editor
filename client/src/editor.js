
// (1) Desired editor features:
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js';

// (2) Desired languages:
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';



// self.MonacoEnvironment = {
// 	getWorker: function (moduleId, label) {
// 		if (label === 'json') {
// 			return new Worker('../node_modules/monaco-editor/esm/vs/language/json/json.worker.js')
// 		}
// 		if (label === 'css') {
// 			return new Worker('../node_modules/monaco-editor/esm/vs/language/css/css.worker.js')
// 		}
// 		if (label === 'html') {
// 			return new Worker('../node_modules/monaco-editor/esm/vs/language/html/html.worker.js')
// 		}
// 		if (label === 'typescript' || label === 'javascript') {
// 			return new Worker('../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js')
// 		}
// 		return new Worker('../node_modules/monaco-editor/esm/vs/editor/editor.worker.js')
// 	}
// }

monaco.editor.create(document.getElementById('editor'), {
	value: [
		'function x() {',
		'\tconsole.log("Hello world!");',
		'}'
	].join('\n'),
	language: 'javascript',
	theme: 'vs-dark',
	fontSize: '16px',
});
