"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findInAst = findInAst;
function findInAst(node, criterion, shouldRecurse) {
    if (shouldRecurse === void 0) { shouldRecurse = function () { return true; }; }
    var stack = [node];
    while (stack.length > 0) {
        var node_1 = stack.pop();
        if (criterion(node_1)) {
            return node_1;
        }
        if (shouldRecurse(node_1)) {
            stack.push.apply(stack, node_1.children);
        }
    }
    return null;
}
