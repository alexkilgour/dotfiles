"use strict";
const path = require("path");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
var AllFixesRequest;
(function (AllFixesRequest) {
    AllFixesRequest.type = { get method() { return 'textDocument/xo/allFixes'; } };
})(AllFixesRequest || (AllFixesRequest = {}));
function activate(context) {
    // We need to go one level up since an extension compile the js code into
    // the output folder.
    const serverModule = path.join(__dirname, '..', 'server', 'server.js');
    const debugOptions = { execArgv: ['--nolazy', '--debug=6004'] };
    const serverOptions = {
        run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
        debug: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc, options: debugOptions }
    };
    const clientOptions = {
        documentSelector: ['javascript', 'javascriptreact'],
        synchronize: {
            configurationSection: 'xo',
            fileEvents: [
                vscode_1.workspace.createFileSystemWatcher('**/package.json')
            ]
        }
    };
    const client = new vscode_languageclient_1.LanguageClient('XO Linter', serverOptions, clientOptions);
    function applyTextEdits(uri, documentVersion, edits) {
        const textEditor = vscode_1.window.activeTextEditor;
        if (textEditor && textEditor.document.uri.toString() === uri) {
            if (textEditor.document.version !== documentVersion) {
                vscode_1.window.showInformationMessage(`XO fixes are outdated and can't be applied to the document.`);
            }
            textEditor.edit(mutator => {
                for (const edit of edits) {
                    mutator.replace(vscode_languageclient_1.Protocol2Code.asRange(edit.range), edit.newText);
                }
            }).then((success) => {
                if (!success) {
                    vscode_1.window.showErrorMessage('Failed to apply XO fixes to the document. Please consider opening an issue with steps to reproduce.');
                }
            });
        }
    }
    function fixAllProblems() {
        const textEditor = vscode_1.window.activeTextEditor;
        if (!textEditor) {
            return;
        }
        const uri = textEditor.document.uri.toString();
        client.sendRequest(AllFixesRequest.type, { textDocument: { uri } }).then((result) => {
            if (result) {
                applyTextEdits(uri, result.documentVersion, result.edits);
            }
        }, () => {
            vscode_1.window.showErrorMessage('Failed to apply XO fixes to the document. Please consider opening an issue with steps to reproduce.');
        });
    }
    context.subscriptions.push(new vscode_languageclient_1.SettingMonitor(client, 'xo.enable').start(), vscode_1.commands.registerCommand('xo.fix', fixAllProblems));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map