"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const parse_engine_registry_1 = require("./parse-engines/parse-engine-registry");
class Fetcher {
    static findAllParseableDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            const languages = parse_engine_registry_1.default.supportedLanguagesIds.join(',');
            return yield vscode.workspace.findFiles(`**/*.{${languages}}`, '**/node_modules');
        });
    }
}
exports.default = Fetcher;
//# sourceMappingURL=fetcher.js.map