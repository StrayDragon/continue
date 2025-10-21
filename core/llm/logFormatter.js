"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMLogFormatter = void 0;
// Markers for different overlapping interactions.
var LOG_PREFIXES = [" ", "|", "&", "%", "#"];
// Wrap wide to avoid messing up code
var DEFAULT_WRAP_WIDTH = 100;
function formatTimestamp(timestamp) {
    var date = new Date(timestamp);
    var hours = date.getUTCHours().toString().padStart(2, "0");
    var minutes = date.getUTCMinutes().toString().padStart(2, "0");
    var seconds = date.getUTCSeconds();
    var milliseconds = date.getUTCMilliseconds();
    // Format seconds with one decimal place
    var secondsFormatted = "".concat(seconds, ".").concat(Math.floor(milliseconds / 100));
    return "".concat(hours, ":").concat(minutes, ":").concat(secondsFormatted.padStart(4, "0"));
}
/**
 * A class that formats LLM log output as a human-readable stream.
 * The general appearance of the output is something like:
 *
 *  01:23:45.6 [Chat]
 *             Options: {
 *               "maxTokens": 1000,
 *             }
 *             Role: system
 *             | You are a helpful assistant.
 *             Role: user
 *             | Who are you?
 *        +0.2 Role: assistant
 *             | How can I help you today?
 *        +0.3 | I can tell you about the weather or the stock mark
 *        +0.4 . et. [THIS LINE IS WRAPPED]
 * |01:23:46.1 [Complete]
 * |           Options: {
 * |             "maxTokens": 1000,
 * |           }
 * |           Prefix:
 * |           | COMPLETE THIS
 *        +0.6 Success
 *             PromptTokens: 50
 *             GeneratedTokens: 30
 * |      +0.2 Result:
 * |           | COMPLETION
 *
 * The lines with | are a second interaction that starts while the
 * first one is still in progress; every interaction starts with
 * an absolute timestamp, and relative timestamps are included for
 * separately received results in the same interaction.
 */
var LLMLogFormatter = /** @class */ (function () {
    /**
     * Creates a new LLMLogWriter.
     * @param logger - The LLMLogger instance to listen to for log items
     * @param output - Stream to write formatted output to
     * @param wrapWidth - Maximum width of a line before wrapping
     */
    function LLMLogFormatter(logger, output, wrapWidth) {
        if (wrapWidth === void 0) { wrapWidth = DEFAULT_WRAP_WIDTH; }
        var _this = this;
        this.logger = logger;
        this.output = output;
        this.wrapWidth = wrapWidth;
        // Current active interactions
        this.interactions = {};
        this.lastItem = null;
        // Item that started the current line; we use this to determine
        // if the next line needs a timestamp.
        this.lastLineStartItem = null;
        this.openLine = false;
        this.openLineChars = 0;
        this.lastFreedPrefix = null;
        this.logger.onLogItem(function (item) {
            _this.logItem(item);
        });
    }
    LLMLogFormatter.prototype.getInteractionData = function (item) {
        var interaction = this.interactions[item.interactionId];
        if (interaction !== undefined) {
            return interaction;
        }
        var usedPrefixes = Object.values(this.interactions).map(function (interaction) { return interaction.prefix; });
        // Select a prefix that is not currently in use, and is
        // also not the last retired prefix - but with the
        // exception that we can reuse the empty prefix " "
        // immediately - this isn't confusing.
        var i = 0;
        var prefix;
        while (true) {
            var candidate = i < LOG_PREFIXES.length ? LOG_PREFIXES[i] : "X";
            if (!usedPrefixes.includes(candidate) &&
                (candidate === " " || candidate !== this.lastFreedPrefix)) {
                prefix = candidate;
                break;
            }
            i++;
        }
        this.interactions[item.interactionId] = {
            prefix: prefix,
            startItem: item,
            lastItem: null,
        };
        return this.interactions[item.interactionId];
    };
    LLMLogFormatter.prototype.formatTimestamp = function (interaction, item) {
        if (item !== this.lastLineStartItem) {
            if (item === interaction.startItem) {
                return formatTimestamp(item.timestamp);
            }
            else {
                var delta = (item.timestamp - interaction.startItem.timestamp) / 1000;
                return ("+" + delta.toFixed(1)).padStart(10, " ");
            }
        }
        else {
            return "          ";
        }
    };
    // the implementation behind logLines and logMessageText
    LLMLogFormatter.prototype.logFragment = function (item, fragment, startAt, marker, joinBefore, joinAfter, wrap) {
        var _a;
        if (marker === void 0) { marker = ""; }
        if (joinBefore === void 0) { joinBefore = false; }
        if (joinAfter === void 0) { joinAfter = false; }
        if (wrap === void 0) { wrap = false; }
        var interaction = this.getInteractionData(item);
        if (this.openLine &&
            (!joinBefore || item.interactionId !== ((_a = this.lastItem) === null || _a === void 0 ? void 0 : _a.interactionId))) {
            this.openLine = false;
            this.openLineChars = 0;
            this.output.write("\n");
        }
        var continueAt = null;
        if (wrap &&
            fragment.length - startAt > this.wrapWidth - this.openLineChars) {
            continueAt = startAt + this.wrapWidth - this.openLineChars;
            // Look for a better line-breaking point at whitespace
            var searchBackwardLimit = Math.max(startAt, continueAt - 20); // Don't look back too far
            for (var i = continueAt; i > searchBackwardLimit; i--) {
                if (/\s/.test(fragment.charAt(i))) {
                    continueAt = i + 1; // Break after the whitespace
                    break;
                }
            }
            // When there's whitespace immediately after the wrap width,
            // the above will result in breaking *after* that, so we exceed
            // the wrap width. The trimEnd() avoids that.
            fragment = fragment.substring(startAt, continueAt).trimEnd();
            joinAfter = false;
        }
        else if (startAt > 0) {
            fragment = fragment.substring(startAt);
        }
        if (!this.openLine || !this.openLine) {
            var timestamp = this.formatTimestamp(interaction, item);
            this.output.write("".concat(interaction.prefix).concat(timestamp, " ").concat(marker));
            this.lastLineStartItem = item;
        }
        this.output.write(fragment);
        this.openLine = joinAfter;
        this.lastItem = item;
        if (!this.openLine) {
            this.output.write("\n");
            this.openLineChars = 0;
        }
        else {
            this.openLineChars += fragment.length;
        }
        return continueAt;
    };
    // Use for everything but text content; a newline is
    // implicitly added at the end of content
    LLMLogFormatter.prototype.logLines = function (item, content, marker) {
        if (marker === void 0) { marker = ""; }
        for (var _i = 0, _a = content.split("\n"); _i < _a.length; _i++) {
            var line = _a[_i];
            this.logFragment(item, line, 0, marker);
        }
    };
    // This logs text context - as compared to logLines:
    //  - No newline is appended to the end of content
    //  - consecutive calls to logMessageText for the same interaction
    //    will join onto a single line
    //  - It will wrap text at the wrap width
    LLMLogFormatter.prototype.logMessageText = function (item, content) {
        var lines = content.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var startAt = 0;
            var marker = "| ";
            while (startAt !== null) {
                // When wrapping, the next start position is turned;
                // null means we've written everything
                startAt = this.logFragment(item, lines[i], startAt, marker, true, i === lines.length - 1, true);
                marker = ". ";
            }
        }
    };
    LLMLogFormatter.prototype.logToolcalls = function (item, toolsCalls) {
        for (var _i = 0, toolsCalls_1 = toolsCalls; _i < toolsCalls_1.length; _i++) {
            var toolCall = toolsCalls_1[_i];
            this.logLines(item, "Tool call: ".concat(JSON.stringify(toolCall, undefined, 2)));
        }
    };
    LLMLogFormatter.prototype.logMessageContent = function (item, message) {
        if (typeof message.content === "string") {
            this.logMessageText(item, message.content);
        }
        else {
            for (var _i = 0, _a = message.content; _i < _a.length; _i++) {
                var part = _a[_i];
                if (part.type === "text") {
                    this.logMessageText(item, part.text);
                }
                else {
                    this.logLines(item, "Image: ".concat(part.imageUrl.url));
                }
            }
        }
    };
    LLMLogFormatter.prototype.logMessage = function (item, message, forceRole) {
        var _a;
        if (forceRole === void 0) { forceRole = false; }
        var showRole = true;
        if (!forceRole &&
            (message.role === "assistant" || message.role === "thinking")) {
            var interaction = this.getInteractionData(item);
            var lastMessage = ((_a = interaction.lastItem) === null || _a === void 0 ? void 0 : _a.kind) === "message"
                ? interaction.lastItem.message
                : null;
            if (message.role === (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.role)) {
                showRole = false;
            }
        }
        if (showRole) {
            this.logLines(item, "Role: " + message.role);
        }
        switch (message.role) {
            case "assistant":
                if (message.toolCalls) {
                    this.logToolcalls(item, message.toolCalls);
                }
                this.logMessageContent(item, message);
                break;
            case "thinking":
                if (message.toolCalls) {
                    this.logToolcalls(item, message.toolCalls);
                }
                this.logMessageContent(item, message);
                if (message.redactedThinking) {
                    this.logLines(item, "Redacted Thinking: ".concat(message.redactedThinking));
                }
                if (message.signature) {
                    this.logLines(item, "Signature: ".concat(message.signature));
                }
                break;
            case "user":
                this.logMessageContent(item, message);
                break;
            case "system":
                this.logMessageText(item, message.content);
                break;
            case "tool":
                this.logLines(item, "Tool Call ID: ".concat(message.toolCallId));
                this.logMessageText(item, message.content);
                break;
        }
    };
    LLMLogFormatter.prototype.logTokens = function (item) {
        this.logLines(item, "Prompt Tokens: ".concat(item.promptTokens));
        this.logLines(item, "Generated Tokens: ".concat(item.generatedTokens));
        if (item.thinkingTokens > 0) {
            this.logLines(item, "Thinking Tokens: ".concat(item.thinkingTokens));
        }
    };
    LLMLogFormatter.prototype.logOptions = function (item) {
        this.logLines(item, "Options: " + JSON.stringify(item.options, undefined, 2));
    };
    LLMLogFormatter.prototype.logItem = function (item) {
        var _a;
        var interaction = this.getInteractionData(item);
        switch (item.kind) {
            case "startChat":
                this.logLines(item, "[Chat]");
                this.logOptions(item);
                var lastMessage = null;
                for (var _i = 0, _b = item.messages; _i < _b.length; _i++) {
                    var message = _b[_i];
                    this.logMessage(item, message, true);
                }
                break;
            case "startComplete":
                this.logLines(item, "[Complete]");
                this.logOptions(item);
                this.logLines(item, "Prompt:");
                this.logLines(item, item.prompt, "| ");
                break;
            case "startFim":
                this.logLines(item, "[Fim]");
                this.logOptions(item);
                this.logLines(item, "Prefix:");
                this.logLines(item, item.prefix, "| ");
                this.logLines(item, "Suffix:");
                this.logLines(item, item.suffix, "| ");
                break;
            case "chunk":
                if (((_a = interaction.lastItem) === null || _a === void 0 ? void 0 : _a.kind) !== "chunk") {
                    this.logLines(item, "Result:");
                }
                this.logMessageText(item, item.chunk);
                break;
            case "message":
                this.logMessage(item, item.message);
                break;
            case "cancel":
                this.logLines(item, "Cancelled");
                this.logTokens(item);
                break;
            case "error":
                this.logLines(item, "Error");
                this.logTokens(item);
                break;
            case "success":
                this.logLines(item, "Success");
                this.logTokens(item);
                break;
        }
        if (item.kind === "cancel" ||
            item.kind === "error" ||
            item.kind === "success") {
            if (interaction.prefix !== " ") {
                this.lastFreedPrefix = interaction.prefix;
            }
            delete this.interactions[item.interactionId];
        }
        else {
            interaction.lastItem = item;
        }
    };
    return LLMLogFormatter;
}());
exports.LLMLogFormatter = LLMLogFormatter;
