"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyAnthropicCachingToOpenRouterBody = void 0;
var AnthropicCachingStrategies_js_1 = require("./AnthropicCachingStrategies.js");
var AnthropicUtils_js_1 = require("./AnthropicUtils.js");
var convertContentToBlocks = function (content) {
    if (typeof content === "string" || typeof content === "number") {
        var text = String(content);
        return {
            blocks: [
                {
                    type: "text",
                    text: text,
                },
            ],
            textPartIndices: [null],
            wasString: true,
        };
    }
    if (!Array.isArray(content)) {
        return {
            blocks: [],
            textPartIndices: [],
            wasString: false,
        };
    }
    var blocks = [];
    var textPartIndices = [];
    content.forEach(function (part, idx) {
        var _a;
        if ((part === null || part === void 0 ? void 0 : part.type) === "text") {
            blocks.push({
                type: "text",
                text: (_a = part.text) !== null && _a !== void 0 ? _a : "",
            });
            textPartIndices.push(idx);
        }
        else {
            blocks.push(__assign({}, (part !== null && part !== void 0 ? part : {})));
            textPartIndices.push(null);
        }
    });
    return {
        blocks: blocks,
        textPartIndices: textPartIndices,
        wasString: false,
    };
};
var convertToAnthropic = function (body) {
    var _a, _b;
    var systemBlocks = [];
    var systemMappings = [];
    var messages = [];
    var messageMappings = [];
    var systemOffset = 0;
    body.messages.forEach(function (message, index) {
        var _a = convertContentToBlocks(message.content), blocks = _a.blocks, textPartIndices = _a.textPartIndices, wasString = _a.wasString;
        if (message.role === "system") {
            var length_1 = blocks.length;
            systemMappings.push({
                openaiIndex: index,
                start: systemOffset,
                length: length_1,
                wasString: wasString,
                originalContent: message.content,
                textPartIndices: textPartIndices,
            });
            systemBlocks.push.apply(systemBlocks, blocks);
            systemOffset += length_1;
        }
        else {
            messages.push({
                role: message.role,
                content: blocks,
            });
            messageMappings.push({
                openaiIndex: index,
                anthropicIndex: messages.length - 1,
                role: message.role,
                wasString: wasString,
                originalContent: message.content,
                textPartIndices: textPartIndices,
            });
        }
    });
    var tools = (_a = body.tools) === null || _a === void 0 ? void 0 : _a.filter(function (tool) { return tool.type === "function"; }).map(function (tool) { return (0, AnthropicUtils_js_1.openaiToolToAnthropicTool)(tool); });
    var anthropicBody = {
        model: body.model,
        messages: messages,
        max_tokens: (_b = body.max_tokens) !== null && _b !== void 0 ? _b : 1,
        system: systemBlocks.length > 0 ? systemBlocks : undefined,
        tools: tools,
    };
    return { anthropicBody: anthropicBody, systemMappings: systemMappings, messageMappings: messageMappings };
};
var applyAnthropicCachingToOpenRouterBody = function (body, strategy) {
    var _a, _b, _c, _d, _e;
    var _f = convertToAnthropic(body), anthropicBody = _f.anthropicBody, systemMappings = _f.systemMappings, messageMappings = _f.messageMappings;
    var cachingStrategy = (_a = AnthropicCachingStrategies_js_1.CACHING_STRATEGIES[strategy]) !== null && _a !== void 0 ? _a : AnthropicCachingStrategies_js_1.CACHING_STRATEGIES.systemAndTools;
    var cachedBody = cachingStrategy(__assign({}, anthropicBody));
    cachedBody.messages = (_b = cachedBody.messages) !== null && _b !== void 0 ? _b : [];
    (0, AnthropicUtils_js_1.addCacheControlToLastTwoUserMessages)(cachedBody.messages);
    var cachedSystem = Array.isArray(cachedBody.system)
        ? cachedBody.system
        : [];
    systemMappings.forEach(function (mapping) {
        var openaiMessage = body.messages[mapping.openaiIndex];
        if (!openaiMessage) {
            return;
        }
        var slice = cachedSystem.slice(mapping.start, mapping.start + mapping.length);
        var hasCache = slice.some(function (block) { return block === null || block === void 0 ? void 0 : block.cache_control; });
        if (!hasCache) {
            openaiMessage.content = mapping.originalContent;
            return;
        }
        if (mapping.wasString) {
            openaiMessage.content = slice.map(function (block) {
                var _a;
                return (__assign({ type: "text", text: (_a = block === null || block === void 0 ? void 0 : block.text) !== null && _a !== void 0 ? _a : "" }, ((block === null || block === void 0 ? void 0 : block.cache_control) ? { cache_control: block.cache_control } : {})));
            });
            return;
        }
        if (Array.isArray(mapping.originalContent)) {
            var newParts_1 = mapping.originalContent.map(function (part) { return (__assign({}, part)); });
            slice.forEach(function (block, idx) {
                var originalIndex = mapping.textPartIndices[idx];
                if (originalIndex === null ||
                    originalIndex === undefined ||
                    !(block === null || block === void 0 ? void 0 : block.cache_control)) {
                    return;
                }
                newParts_1[originalIndex] = __assign(__assign(__assign({}, newParts_1[originalIndex]), { cache_control: block.cache_control }), (block.text !== undefined ? { text: block.text } : {}));
            });
            openaiMessage.content = newParts_1;
        }
    });
    var cachedMessages = (_c = cachedBody.messages) !== null && _c !== void 0 ? _c : [];
    messageMappings.forEach(function (mapping) {
        var openaiMessage = body.messages[mapping.openaiIndex];
        var cachedMessage = cachedMessages[mapping.anthropicIndex];
        if (!openaiMessage || !cachedMessage) {
            return;
        }
        if (cachedMessage.role !== "user") {
            openaiMessage.content = mapping.originalContent;
            return;
        }
        var contentArray = Array.isArray(cachedMessage.content)
            ? cachedMessage.content
            : [];
        var hasCache = contentArray.some(function (block) { return block === null || block === void 0 ? void 0 : block.cache_control; });
        if (!hasCache) {
            openaiMessage.content = mapping.originalContent;
            return;
        }
        if (mapping.wasString) {
            openaiMessage.content = contentArray.map(function (block) {
                var _a;
                return (__assign({ type: "text", text: (_a = block === null || block === void 0 ? void 0 : block.text) !== null && _a !== void 0 ? _a : "" }, ((block === null || block === void 0 ? void 0 : block.cache_control) ? { cache_control: block.cache_control } : {})));
            });
            return;
        }
        if (Array.isArray(mapping.originalContent)) {
            var newParts_2 = mapping.originalContent.map(function (part) { return (__assign({}, part)); });
            contentArray.forEach(function (block, idx) {
                var originalIndex = mapping.textPartIndices[idx];
                if (originalIndex === null ||
                    originalIndex === undefined ||
                    !(block === null || block === void 0 ? void 0 : block.cache_control)) {
                    return;
                }
                newParts_2[originalIndex] = __assign(__assign(__assign({}, newParts_2[originalIndex]), { cache_control: block.cache_control }), (block.text !== undefined ? { text: block.text } : {}));
            });
            openaiMessage.content = newParts_2;
        }
    });
    if (((_d = body.tools) === null || _d === void 0 ? void 0 : _d.length) && ((_e = cachedBody.tools) === null || _e === void 0 ? void 0 : _e.length)) {
        body.tools = body.tools.map(function (tool, idx) {
            var _a;
            var cachedTool = ((_a = cachedBody.tools) !== null && _a !== void 0 ? _a : [])[idx];
            if (!(cachedTool === null || cachedTool === void 0 ? void 0 : cachedTool.cache_control)) {
                return tool;
            }
            return __assign(__assign({}, tool), { cache_control: cachedTool.cache_control });
        });
    }
};
exports.applyAnthropicCachingToOpenRouterBody = applyAnthropicCachingToOpenRouterBody;
