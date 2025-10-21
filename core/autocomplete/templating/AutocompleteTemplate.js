"use strict";
// Fill in the middle prompts
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateForModel = getTemplateForModel;
var uri_js_1 = require("../../util/uri.js");
var types_js_1 = require("../snippets/types.js");
// https://huggingface.co/stabilityai/stable-code-3b
var stableCodeFimTemplate = {
    template: "<fim_prefix>{{{prefix}}}<fim_suffix>{{{suffix}}}<fim_middle>",
    completionOptions: {
        stop: [
            "<fim_prefix>",
            "<fim_suffix>",
            "<fim_middle>",
            "<file_sep>",
            "<|endoftext|>",
            "</fim_middle>",
            "</code>",
        ],
    },
};
// https://github.com/QwenLM/Qwen2.5-Coder?tab=readme-ov-file#3-file-level-code-completion-fill-in-the-middle
// This issue asks about the use of <|repo_name|> and <|file_sep|> together with <|fim_prefix|>, <|fim_suffix|> and <|fim_middle|>
// https://github.com/QwenLM/Qwen2.5-Coder/issues/343
var qwenCoderFimTemplate = {
    template: "<|fim_prefix|>{{{prefix}}}<|fim_suffix|>{{{suffix}}}<|fim_middle|>",
    completionOptions: {
        stop: [
            "<|endoftext|>",
            "<|fim_prefix|>",
            "<|fim_middle|>",
            "<|fim_suffix|>",
            "<|fim_pad|>",
            "<|repo_name|>",
            "<|file_sep|>",
            "<|im_start|>",
            "<|im_end|>",
        ],
    },
};
var seedCoderFimTemplate = {
    template: "<[fim-prefix]>{{{prefix}}}<[fim-suffix]>{{{suffix}}}<[fim-middle]>",
    completionOptions: {
        stop: [
            "<[end▁of▁sentence]>",
            "<[fim-prefix]>",
            "<[fim-middle]>",
            "<[fim-suffix]>",
            "<[PAD▁TOKEN]>",
            "<[SEP▁TOKEN]>",
            "<[begin▁of▁sentence]>",
        ],
    },
};
var codestralFimTemplate = {
    template: "[SUFFIX]{{{suffix}}}[PREFIX]{{{prefix}}}",
    completionOptions: {
        stop: ["[PREFIX]", "[SUFFIX]"],
    },
};
var codestralMultifileFimTemplate = {
    compilePrefixSuffix: function (prefix, suffix, filepath, reponame, snippets, workspaceUris) {
        function getFileName(snippet) {
            return snippet.uri.startsWith("file://")
                ? snippet.uniquePath
                : snippet.uri;
        }
        if (snippets.length === 0) {
            if (suffix.trim().length === 0 && prefix.trim().length === 0) {
                return [
                    "+++++ ".concat((0, uri_js_1.getLastNUriRelativePathParts)(workspaceUris, filepath, 2), "\n").concat(prefix),
                    suffix,
                ];
            }
            return [prefix, suffix];
        }
        var relativePaths = (0, uri_js_1.getShortestUniqueRelativeUriPaths)(__spreadArray(__spreadArray([], snippets.map(function (snippet) {
            return "filepath" in snippet ? snippet.filepath : "file:///Untitled.txt";
        }), true), [
            filepath,
        ], false), workspaceUris);
        var otherFiles = snippets
            .map(function (snippet, i) {
            if (snippet.type === types_js_1.AutocompleteSnippetType.Diff) {
                return snippet.content;
            }
            return "+++++ ".concat(getFileName(relativePaths[i]), " \n").concat(snippet.content);
        })
            .join("\n\n");
        return [
            "".concat(otherFiles, "\n\n+++++ ").concat(getFileName(relativePaths[relativePaths.length - 1]), "\n").concat(prefix),
            suffix,
        ];
    },
    template: function (prefix, suffix) {
        return "[SUFFIX]".concat(suffix, "[PREFIX]").concat(prefix);
    },
    completionOptions: {
        stop: ["[PREFIX]", "[SUFFIX]", "\n+++++ "],
    },
};
var mercuryMultifileFimTemplate = {
    compilePrefixSuffix: function (prefix, suffix, filepath, reponame, snippets, workspaceUris) {
        function getFileName(snippet) {
            return snippet.uri.startsWith("file://")
                ? snippet.uniquePath
                : snippet.uri;
        }
        // Our current snippet format doesn't work well with mercury. We need to clean this up
        snippets = [];
        if (snippets.length === 0) {
            if (suffix.trim().length === 0 && prefix.trim().length === 0) {
                return [
                    "<|file_sep|>".concat((0, uri_js_1.getLastNUriRelativePathParts)(workspaceUris, filepath, 2), "\n<|fim_prefix|>").concat(prefix),
                    suffix,
                ];
            }
            return ["<|fim_prefix|>".concat(prefix), suffix];
        }
        var relativePaths = (0, uri_js_1.getShortestUniqueRelativeUriPaths)(__spreadArray(__spreadArray([], snippets.map(function (snippet) {
            return "filepath" in snippet ? snippet.filepath : "file:///Untitled.txt";
        }), true), [
            filepath,
        ], false), workspaceUris);
        var otherFiles = snippets
            .map(function (snippet, i) {
            if (snippet.type === types_js_1.AutocompleteSnippetType.Diff) {
                return snippet.content;
            }
            return "<|file_sep|>".concat(getFileName(relativePaths[i]), " \n").concat(snippet.content);
        })
            .join("\n\n");
        return [
            "".concat(otherFiles).concat(otherFiles ? "\n\n" : "", "<|file_sep|>").concat(getFileName(relativePaths[relativePaths.length - 1]), "\n<|fim_prefix|>").concat(prefix),
            suffix,
        ];
    },
    template: function (prefix, suffix) {
        return "".concat(prefix, "<|fim_suffix|>").concat(suffix, "<|fim_middle|>");
    },
};
var codegemmaFimTemplate = {
    template: "<|fim_prefix|>{{{prefix}}}<|fim_suffix|>{{{suffix}}}<|fim_middle|>",
    completionOptions: {
        stop: [
            "<|fim_prefix|>",
            "<|fim_suffix|>",
            "<|fim_middle|>",
            "<|file_separator|>",
            "<end_of_turn>",
            "<eos>",
        ],
    },
};
// https://arxiv.org/pdf/2402.19173.pdf section 5.1
var starcoder2FimTemplate = {
    template: function (prefix, suffix, filename, reponame, language, snippets, workspaceUris) {
        var otherFiles = snippets.length === 0
            ? ""
            : "<file_sep>".concat(snippets
                .map(function (snippet) {
                return snippet.content;
            })
                .join("<file_sep>"), "<file_sep>");
        var prompt = "".concat(otherFiles, "<fim_prefix>").concat(prefix, "<fim_suffix>").concat(suffix, "<fim_middle>");
        return prompt;
    },
    completionOptions: {
        stop: [
            "<fim_prefix>",
            "<fim_suffix>",
            "<fim_middle>",
            "<file_sep>",
            "<|endoftext|>",
        ],
    },
};
var codeLlamaFimTemplate = {
    template: "<PRE> {{{prefix}}} <SUF>{{{suffix}}} <MID>",
    completionOptions: { stop: ["<PRE>", "<SUF>", "<MID>", "<EOT>"] },
};
// https://huggingface.co/deepseek-ai/deepseek-coder-1.3b-base
var deepseekFimTemplate = {
    template: "<｜fim▁begin｜>{{{prefix}}}<｜fim▁hole｜>{{{suffix}}}<｜fim▁end｜>",
    completionOptions: {
        stop: [
            "<｜fim▁begin｜>",
            "<｜fim▁hole｜>",
            "<｜fim▁end｜>",
            "//",
            "<｜end▁of▁sentence｜>",
        ],
    },
};
// https://github.com/THUDM/CodeGeeX4/blob/main/guides/Infilling_guideline.md
var codegeexFimTemplate = {
    template: function (prefix, suffix, filepath, reponame, language, allSnippets, workspaceUris) {
        var snippets = allSnippets.filter(function (snippet) { return snippet.type === types_js_1.AutocompleteSnippetType.Code; });
        var relativePaths = (0, uri_js_1.getShortestUniqueRelativeUriPaths)(__spreadArray(__spreadArray([], snippets.map(function (snippet) { return snippet.filepath; }), true), [filepath], false), workspaceUris);
        var baseTemplate = "###PATH:".concat(relativePaths[relativePaths.length - 1], "\n###LANGUAGE:").concat(language, "\n###MODE:BLOCK\n<|code_suffix|>").concat(suffix, "<|code_prefix|>").concat(prefix, "<|code_middle|>");
        if (snippets.length === 0) {
            return "<|user|>\n".concat(baseTemplate, "<|assistant|>\n");
        }
        var references = "###REFERENCE:\n".concat(snippets
            .map(function (snippet, i) { return "###PATH:".concat(relativePaths[i], "\n").concat(snippet.content, "\n"); })
            .join("###REFERENCE:\n"));
        var prompt = "<|user|>\n".concat(references, "\n").concat(baseTemplate, "<|assistant|>\n");
        return prompt;
    },
    completionOptions: {
        stop: [
            "<|user|>",
            "<|code_suffix|>",
            "<|code_prefix|>",
            "<|code_middle|>",
            "<|assistant|>",
            "<|endoftext|>",
        ],
    },
};
var gptAutocompleteTemplate = {
    template: "```\n{{{prefix}}}[BLANK]{{{suffix}}}\n```\n\nFill in the blank to complete the code block. Your response should include only the code to replace [BLANK], without surrounding backticks.",
    completionOptions: { stop: ["\n"] },
};
var holeFillerTemplate = {
    template: function (prefix, suffix) {
        // From https://github.com/VictorTaelin/AI-scripts
        var SYSTEM_MSG = "You are a HOLE FILLER. You are provided with a file containing holes, formatted as '{{HOLE_NAME}}'. Your TASK is to complete with a string to replace this hole with, inside a <COMPLETION/> XML tag, including context-aware indentation, if needed.  All completions MUST be truthful, accurate, well-written and correct.\n\n## EXAMPLE QUERY:\n\n<QUERY>\nfunction sum_evens(lim) {\n  var sum = 0;\n  for (var i = 0; i < lim; ++i) {\n    {{FILL_HERE}}\n  }\n  return sum;\n}\n</QUERY>\n\nTASK: Fill the {{FILL_HERE}} hole.\n\n## CORRECT COMPLETION\n\n<COMPLETION>if (i % 2 === 0) {\n      sum += i;\n    }</COMPLETION>\n\n## EXAMPLE QUERY:\n\n<QUERY>\ndef sum_list(lst):\n  total = 0\n  for x in lst:\n  {{FILL_HERE}}\n  return total\n\nprint sum_list([1, 2, 3])\n</QUERY>\n\n## CORRECT COMPLETION:\n\n<COMPLETION>  total += x</COMPLETION>\n\n## EXAMPLE QUERY:\n\n<QUERY>\n// data Tree a = Node (Tree a) (Tree a) | Leaf a\n\n// sum :: Tree Int -> Int\n// sum (Node lft rgt) = sum lft + sum rgt\n// sum (Leaf val)     = val\n\n// convert to TypeScript:\n{{FILL_HERE}}\n</QUERY>\n\n## CORRECT COMPLETION:\n\n<COMPLETION>type Tree<T>\n  = {$:\"Node\", lft: Tree<T>, rgt: Tree<T>}\n  | {$:\"Leaf\", val: T};\n\nfunction sum(tree: Tree<number>): number {\n  switch (tree.$) {\n    case \"Node\":\n      return sum(tree.lft) + sum(tree.rgt);\n    case \"Leaf\":\n      return tree.val;\n  }\n}</COMPLETION>\n\n## EXAMPLE QUERY:\n\nThe 5th {{FILL_HERE}} is Jupiter.\n\n## CORRECT COMPLETION:\n\n<COMPLETION>planet from the Sun</COMPLETION>\n\n## EXAMPLE QUERY:\n\nfunction hypothenuse(a, b) {\n  return Math.sqrt({{FILL_HERE}}b ** 2);\n}\n\n## CORRECT COMPLETION:\n\n<COMPLETION>a ** 2 + </COMPLETION>";
        var fullPrompt = SYSTEM_MSG +
            "\n\n<QUERY>\n".concat(prefix, "{{FILL_HERE}}").concat(suffix, "\n</QUERY>\nTASK: Fill the {{FILL_HERE}} hole. Answer only with the CORRECT completion, and NOTHING ELSE. Do it now.\n<COMPLETION>");
        return fullPrompt;
    },
    completionOptions: {
        stop: ["</COMPLETION>"],
    },
};
function getTemplateForModel(model) {
    var lowerCaseModel = model.toLowerCase();
    // if (lowerCaseModel.includes("starcoder2")) {
    //   return starcoder2FimTemplate;
    // }
    if (lowerCaseModel.includes("mercury")) {
        return mercuryMultifileFimTemplate;
    }
    if (lowerCaseModel.includes("qwen") && lowerCaseModel.includes("coder")) {
        return qwenCoderFimTemplate;
    }
    if (lowerCaseModel.includes("seed") && lowerCaseModel.includes("coder")) {
        return seedCoderFimTemplate;
    }
    if (lowerCaseModel.includes("starcoder") ||
        lowerCaseModel.includes("star-coder") ||
        lowerCaseModel.includes("starchat") ||
        lowerCaseModel.includes("octocoder") ||
        lowerCaseModel.includes("stable") ||
        lowerCaseModel.includes("codeqwen") ||
        lowerCaseModel.includes("qwen")) {
        return stableCodeFimTemplate;
    }
    if (lowerCaseModel.includes("codestral")) {
        return codestralMultifileFimTemplate;
    }
    if (lowerCaseModel.includes("codegemma")) {
        return codegemmaFimTemplate;
    }
    if (lowerCaseModel.includes("codellama")) {
        return codeLlamaFimTemplate;
    }
    if (lowerCaseModel.includes("deepseek")) {
        return deepseekFimTemplate;
    }
    if (lowerCaseModel.includes("codegeex")) {
        return codegeexFimTemplate;
    }
    if (lowerCaseModel.includes("gpt") ||
        lowerCaseModel.includes("davinci-002") ||
        lowerCaseModel.includes("claude") ||
        lowerCaseModel.includes("granite3") ||
        lowerCaseModel.includes("granite-3")) {
        return holeFillerTemplate;
    }
    return stableCodeFimTemplate;
}
