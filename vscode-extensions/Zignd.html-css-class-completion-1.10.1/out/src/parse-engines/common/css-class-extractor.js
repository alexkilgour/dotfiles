"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const css_class_definition_1 = require("../../common/css-class-definition");
class CssClassExtractor {
    /**
     * @description Extracts class names from CSS AST
     */
    static extract(ast) {
        const classNameRegex = /[.]([\w-]+)/g;
        let definitions = [];
        // go through each of the rules...
        ast.stylesheet.rules.forEach((rule) => {
            // ...of type rule
            if (rule.type === 'rule') {
                // go through each of the selectors of the current rule 
                rule.selectors.forEach((selector) => {
                    let item = null;
                    while (item = classNameRegex.exec(selector)) {
                        definitions.push(new css_class_definition_1.default(item[1]));
                    }
                });
            }
        });
        return definitions;
    }
}
exports.default = CssClassExtractor;
//# sourceMappingURL=css-class-extractor.js.map