"use strict";
const vscode_languageserver_1 = require("vscode-languageserver");
const utils_1 = require("./utils");
const fixes_1 = require("./fixes");
const package_1 = require("./package");
var AllFixesRequest;
(function (AllFixesRequest) {
    AllFixesRequest.type = { get method() { return 'textDocument/xo/allFixes'; } };
})(AllFixesRequest || (AllFixesRequest = {}));
class Linter {
    constructor() {
        this.codeActions = Object.create(null);
        this.connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
        this.documents = new vscode_languageserver_1.TextDocuments();
        // Listen for text document create, change
        this.documents.listen(this.connection);
        // Validate document if it changed
        this.documents.onDidChangeContent(event => {
            this.validateSingle(event.document);
        });
        // Clear the diagnostics when document is closed
        this.documents.onDidClose(event => {
            this.connection.sendDiagnostics({
                uri: event.document.uri,
                diagnostics: []
            });
        });
        this.connection.onInitialize(this.initialize.bind(this));
        this.connection.onDidChangeConfiguration(params => {
            const settings = params.settings;
            this.options = settings.xo ? settings.xo.options || {} : {};
            this.validateMany(this.documents.all());
        });
        this.connection.onDidChangeWatchedFiles(() => {
            this.validateMany(this.documents.all());
        });
        this.connection.onRequest(AllFixesRequest.type, (params) => {
            let result = null;
            const uri = params.textDocument.uri;
            const textDocument = this.documents.get(uri);
            const edits = this.codeActions[uri];
            function createTextEdit(editInfo) {
                return vscode_languageserver_1.TextEdit.replace(vscode_languageserver_1.Range.create(textDocument.positionAt(editInfo.edit.range[0]), textDocument.positionAt(editInfo.edit.range[1])), editInfo.edit.text || '');
            }
            if (edits) {
                const fixes = new fixes_1.Fixes(edits);
                if (!fixes.isEmpty()) {
                    result = {
                        documentVersion: fixes.getDocumentVersion(),
                        edits: fixes.getOverlapFree().map(createTextEdit)
                    };
                }
            }
            return result;
        });
    }
    listen() {
        this.connection.listen();
    }
    initialize(params) {
        this.workspaceRoot = params.rootPath;
        this.package = new package_1.Package(this.workspaceRoot);
        return this.resolveModule();
    }
    resolveModule() {
        const result = {
            capabilities: {
                textDocumentSync: this.documents.syncKind,
                codeActionProvider: true
            }
        };
        if (this.lib) {
            return Promise.resolve(result);
        }
        return vscode_languageserver_1.Files.resolveModule(this.workspaceRoot, 'xo').then((xo) => {
            if (!xo.lintText) {
                return new vscode_languageserver_1.ResponseError(99, 'The XO library doesn\'t export a lintText method.', { retry: false });
            }
            this.lib = xo;
            return result;
        }, () => {
            if (this.package.isDependency('xo')) {
                throw new vscode_languageserver_1.ResponseError(99, 'Failed to load XO library. Make sure XO is installed in your workspace folder using \'npm install xo\' and then press Retry.', { retry: true });
            }
        });
    }
    validateMany(documents) {
        const tracker = new vscode_languageserver_1.ErrorMessageTracker();
        const promises = documents.map(document => {
            return this.validate(document).then(() => { }, err => {
                tracker.add(this.getMessage(err, document));
            });
        });
        return Promise.all(promises)
            .then(() => {
            tracker.sendErrors(this.connection);
        });
    }
    validateSingle(document) {
        return this.validate(document)
            .then(() => { }, (err) => {
            this.connection.window.showErrorMessage(this.getMessage(err, document));
        });
    }
    validate(document) {
        if (!this.package.isDependency('xo')) {
            // Do not validate if `xo` is not a dependency
            return Promise.resolve();
        }
        return this.resolveModule()
            .then(() => {
            const uri = document.uri;
            const fsPath = vscode_languageserver_1.Files.uriToFilePath(uri);
            const contents = document.getText();
            if (fsPath === null) {
                return;
            }
            const options = this.options;
            options.cwd = this.workspaceRoot;
            options.filename = fsPath;
            const report = this.lib.lintText(contents, options);
            // Clean previously computed code actions.
            delete this.codeActions[uri];
            const diagnostics = report.results[0].messages.map((problem) => {
                const diagnostic = utils_1.makeDiagnostic(problem);
                this.recordCodeAction(document, diagnostic, problem);
                return diagnostic;
            });
            this.connection.sendDiagnostics({ uri, diagnostics });
        });
    }
    recordCodeAction(document, diagnostic, problem) {
        if (!problem.fix || !problem.ruleId) {
            return;
        }
        const uri = document.uri;
        let edits = this.codeActions[uri];
        if (!edits) {
            edits = Object.create(null);
            this.codeActions[uri] = edits;
        }
        edits[utils_1.computeKey(diagnostic)] = {
            label: `Fix this ${problem.ruleId} problem`,
            documentVersion: document.version,
            ruleId: problem.ruleId,
            edit: problem.fix
        };
    }
    getMessage(err, document) {
        if (typeof err.message === 'string' || err.message instanceof String) {
            return err.message;
        }
        else {
            return `An unknown error occurred while validating file: ${vscode_languageserver_1.Files.uriToFilePath(document.uri)}`;
        }
    }
}
new Linter().listen();
//# sourceMappingURL=server.js.map