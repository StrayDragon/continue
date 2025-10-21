"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryLogger = void 0;
exports.initializeSentry = initializeSentry;
exports.createSpan = createSpan;
exports.captureException = captureException;
exports.captureLog = captureLog;
var Sentry = require("@sentry/node");
var node_os_1 = require("node:os");
var isContinueTeamMember_js_1 = require("../isContinueTeamMember.js");
var anonymization_js_1 = require("./anonymization.js");
var constants_js_1 = require("./constants.js");
var SentryLogger = /** @class */ (function () {
    function SentryLogger() {
    }
    SentryLogger.initializeSentryClient = function (release) {
        try {
            // For shared environments like VSCode extensions, we need to avoid global state pollution
            // Filter out integrations that use global state
            // See https://docs.sentry.io/platforms/javascript/best-practices/shared-environments/
            // Filter integrations that use the global variable
            var integrations = Sentry.getDefaultIntegrations({}).filter(function (defaultIntegration) {
                // Remove integrations that might interfere with shared environments
                return ![
                    "OnUncaughtException",
                    "OnUnhandledRejection",
                    "ContextLines",
                    "LocalVariables",
                ].includes(defaultIntegration.name);
            });
            // Create client manually without polluting global state
            var client = new Sentry.NodeClient({
                dsn: constants_js_1.SENTRY_DSN,
                release: release,
                environment: process.env.NODE_ENV,
                transport: Sentry.makeNodeTransport,
                stackParser: Sentry.defaultStackParser,
                // For basic error tracking, a lower sample rate should be fine
                sampleRate: 0.1,
                tracesSampleRate: 0.1,
                // Privacy-conscious default
                sendDefaultPii: false,
                // Strip sensitive data and add basic properties before sending events
                beforeSend: function (event) {
                    // First apply anonymization
                    var anonymizedEvent = (0, anonymization_js_1.anonymizeSentryEvent)(event);
                    if (!anonymizedEvent)
                        return null;
                    // Add basic properties similar to PostHog telemetry
                    if (!anonymizedEvent.tags)
                        anonymizedEvent.tags = {};
                    if (!anonymizedEvent.extra)
                        anonymizedEvent.extra = {};
                    // Add OS information
                    if (SentryLogger.os) {
                        anonymizedEvent.tags.os = SentryLogger.os;
                    }
                    // Add ideInfo properties spread out as top-level properties
                    if (SentryLogger.ideInfo) {
                        anonymizedEvent.tags.extensionVersion =
                            SentryLogger.ideInfo.extensionVersion;
                        anonymizedEvent.tags.ideName = SentryLogger.ideInfo.name;
                        anonymizedEvent.tags.ideType = SentryLogger.ideInfo.ideType;
                        anonymizedEvent.tags.ideVersion = SentryLogger.ideInfo.version;
                        anonymizedEvent.tags.remoteName = SentryLogger.ideInfo.remoteName;
                        anonymizedEvent.tags.isPrerelease =
                            SentryLogger.ideInfo.isPrerelease;
                    }
                    return anonymizedEvent;
                },
                // Use filtered integrations for Node.js/VSCode shared environment
                integrations: integrations,
                // Enable structured logging
                _experiments: {
                    enableLogs: true,
                },
            });
            // Create a new scope and set the client
            var scope = new Sentry.Scope();
            scope.setClient(client);
            // Initialize the client after setting it on the scope
            client.init();
            return { client: client, scope: scope };
        }
        catch (error) {
            console.error("Failed to initialize Sentry client:", error);
            return { client: undefined, scope: undefined };
        }
    };
    SentryLogger.setup = function (allowAnonymousTelemetry, uniqueId, ideInfo, userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, client, scope;
            return __generator(this, function (_b) {
                // TODO: Remove Continue team member check once Sentry is ready for all users
                SentryLogger.allowTelemetry =
                    allowAnonymousTelemetry && (0, isContinueTeamMember_js_1.isContinueTeamMember)(userEmail);
                SentryLogger.uniqueId = uniqueId;
                SentryLogger.ideInfo = ideInfo;
                SentryLogger.os = node_os_1.default.platform();
                if (!SentryLogger.allowTelemetry) {
                    SentryLogger.client = undefined;
                    SentryLogger.scope = undefined;
                }
                else if (!SentryLogger.client) {
                    _a = SentryLogger.initializeSentryClient(ideInfo.extensionVersion), client = _a.client, scope = _a.scope;
                    SentryLogger.client = client;
                    SentryLogger.scope = scope;
                }
                return [2 /*return*/];
            });
        });
    };
    SentryLogger.ensureInitialized = function () {
        if (!SentryLogger.allowTelemetry || SentryLogger.client) {
            return;
        }
        if (SentryLogger.ideInfo) {
            var _a = SentryLogger.initializeSentryClient(SentryLogger.ideInfo.extensionVersion), client = _a.client, scope = _a.scope;
            SentryLogger.client = client;
            SentryLogger.scope = scope;
        }
    };
    Object.defineProperty(SentryLogger, "lazyClient", {
        get: function () {
            SentryLogger.ensureInitialized();
            return SentryLogger.client;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SentryLogger, "lazyScope", {
        get: function () {
            SentryLogger.ensureInitialized();
            return SentryLogger.scope;
        },
        enumerable: false,
        configurable: true
    });
    SentryLogger.shutdownSentryClient = function () {
        if (SentryLogger.client) {
            void SentryLogger.client.close();
            SentryLogger.client = undefined;
            SentryLogger.scope = undefined;
        }
    };
    SentryLogger.client = undefined;
    SentryLogger.scope = undefined;
    SentryLogger.uniqueId = "NOT_UNIQUE";
    SentryLogger.os = undefined;
    SentryLogger.ideInfo = undefined;
    SentryLogger.allowTelemetry = false;
    return SentryLogger;
}());
exports.SentryLogger = SentryLogger;
/**
 * Initialize Sentry for error tracking, performance monitoring, and structured logging.
 * Returns the Sentry client and scope, or undefined objects if telemetry is disabled.
 */
function initializeSentry() {
    return {
        client: SentryLogger.lazyClient,
        scope: SentryLogger.lazyScope,
    };
}
// Export utility functions for using Sentry throughout the application
/**
 * Create a custom span for performance monitoring
 *
 * @param operation The operation category (e.g., "http.client", "ui.click", "db.query")
 * @param name A descriptive name for the span
 * @param callback The function to execute within the span
 * @returns The result of the callback function
 */
function createSpan(operation, name, callback) {
    var client = SentryLogger.lazyClient;
    if (!client) {
        return callback();
    }
    // Use withScope from Sentry to isolate the span context
    return Sentry.withScope(function (isolatedScope) {
        isolatedScope.setClient(client);
        return Sentry.startSpan({
            op: operation,
            name: name,
        }, function () { return callback(); });
    });
}
/**
 * Capture an exception and send it to Sentry
 *
 * @param error The error to capture
 * @param context Additional context information
 */
function captureException(error, context) {
    var scope = SentryLogger.lazyScope;
    if (!scope) {
        return;
    }
    try {
        // Add context to scope if provided
        if (context) {
            scope.setExtras(context);
        }
        // Use scope's captureException to avoid global state
        scope.captureException(error);
    }
    catch (e) {
        console.error("Failed to capture exception to Sentry: ".concat(e));
    }
}
/**
 * Capture a structured log message and send it to Sentry
 *
 * @param message The log message
 * @param level The severity level (default: 'info')
 * @param context Additional context information
 */
function captureLog(message, level, context) {
    if (level === void 0) { level = "info"; }
    var scope = SentryLogger.lazyScope;
    if (!scope) {
        return;
    }
    try {
        // Add context to scope if provided
        if (context) {
            scope.setExtras(context);
        }
        // Use scope's captureMessage to avoid global state
        scope.captureMessage(message, level);
    }
    catch (e) {
        console.error("Failed to capture log to Sentry: ".concat(e));
    }
}
