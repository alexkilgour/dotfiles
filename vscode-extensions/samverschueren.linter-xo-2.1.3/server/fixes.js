"use strict";
const utils_1 = require("./utils");
/**
 * Credits to vscode-eslint (https://github.com/Microsoft/vscode-eslint)
 */
class Fixes {
    constructor(edits) {
        this.edits = edits;
        this.keys = Object.keys(edits);
    }
    static overlaps(lastEdit, newEdit) {
        return !!lastEdit && lastEdit.edit.range[1] > newEdit.edit.range[0];
    }
    isEmpty() {
        return this.keys.length === 0;
    }
    getDocumentVersion() {
        return this.edits[this.keys[0]].documentVersion;
    }
    getScoped(diagnostics) {
        let result = [];
        for (let diagnostic of diagnostics) {
            let key = utils_1.computeKey(diagnostic);
            let editInfo = this.edits[key];
            if (editInfo) {
                result.push(editInfo);
            }
        }
        return result;
    }
    getAllSorted() {
        let result = this.keys.map(key => this.edits[key]);
        return result.sort((a, b) => {
            let d = a.edit.range[0] - b.edit.range[0];
            if (d !== 0) {
                return d;
            }
            if (a.edit.range[1] === 0) {
                return -1;
            }
            if (b.edit.range[1] === 0) {
                return 1;
            }
            return a.edit.range[1] - b.edit.range[1];
        });
    }
    getOverlapFree() {
        let sorted = this.getAllSorted();
        if (sorted.length <= 1) {
            return sorted;
        }
        let result = [];
        let last = sorted[0];
        result.push(last);
        for (let i = 1; i < sorted.length; i++) {
            let current = sorted[i];
            if (!Fixes.overlaps(last, current)) {
                result.push(current);
                last = current;
            }
        }
        return result;
    }
}
exports.Fixes = Fixes;
//# sourceMappingURL=fixes.js.map