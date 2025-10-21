"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigYamlDocumentLinkProvider = void 0;
var path = require("path");
var vscode = require("vscode");
var ConfigYamlDocumentLinkProvider = /** @class */ (function () {
    function ConfigYamlDocumentLinkProvider() {
        this.usesPattern = /^\s*#?\s*-\s*uses:\s*(.+)$/;
    }
    ConfigYamlDocumentLinkProvider.prototype.provideDocumentLinks = function (document, token) {
        var links = [];
        for (var lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
            if (token.isCancellationRequested) {
                return [];
            }
            var line = document.lineAt(lineIndex);
            var match = this.usesPattern.exec(line.text);
            if (match) {
                var slug = match[1].trim();
                // Remove any leading comment symbols (#)
                slug = slug.replace(/^\s*(#\s*)+/, "");
                // Check for surrounding quotes
                var quoteMatch = slug.match(/^(['"])(.*)\1/);
                if (quoteMatch) {
                    // If quoted, remove the quotes but keep everything inside (including #)
                    slug = quoteMatch[2].trim();
                }
                else {
                    // If not quoted, remove any trailing comment
                    slug = slug.replace(/\s*#.*$/, "").trim();
                }
                if (slug === "") {
                    continue; // Skip empty slugs
                }
                if (/^(https?:\/\/|file:\/\/)/.test(slug)) {
                    // VS Code already handles external links, so skip them
                    continue;
                }
                var startPos = line.text.indexOf(slug);
                var range = new vscode.Range(lineIndex, startPos, lineIndex, startPos + slug.length);
                var linkUri = void 0;
                if (slug.startsWith("./") || slug.startsWith("../")) {
                    var currentFilePath = document.uri.fsPath;
                    var parentPath = path.dirname(currentFilePath);
                    var resolvedPath = path.resolve(parentPath, slug);
                    linkUri = vscode.Uri.file(resolvedPath);
                }
                else {
                    linkUri = vscode.Uri.parse("https://hub.continue.dev/".concat(slug));
                }
                var link = new vscode.DocumentLink(range, linkUri);
                links.push(link);
            }
        }
        return links;
    };
    ConfigYamlDocumentLinkProvider.prototype.resolveDocumentLink = function (link, token) {
        return link;
    };
    return ConfigYamlDocumentLinkProvider;
}());
exports.ConfigYamlDocumentLinkProvider = ConfigYamlDocumentLinkProvider;
