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
exports.ReverseMessageIde = void 0;
var ReverseMessageIde = /** @class */ (function () {
    function ReverseMessageIde(_on, ide) {
        this._on = _on;
        this.ide = ide;
        this.initializeListeners();
    }
    ReverseMessageIde.prototype.on = function (messageType, handler) {
        this._on(messageType, function (msg) {
            var data = msg.data;
            var result = handler(data);
            return result;
        });
    };
    ReverseMessageIde.prototype.initializeListeners = function () {
        var _this = this;
        this.on("getFileStats", function (data) {
            return _this.ide.getFileStats(data.files);
        });
        this.on("getGitRootPath", function (data) {
            return _this.ide.getGitRootPath(data.dir);
        });
        this.on("listDir", function (data) {
            return _this.ide.listDir(data.dir);
        });
        this.on("showToast", function (data) {
            var _a;
            return (_a = _this.ide).showToast.apply(_a, data);
        });
        this.on("getRepoName", function (data) {
            return _this.ide.getRepoName(data.dir);
        });
        this.on("getDebugLocals", function (data) {
            return _this.ide.getDebugLocals(data.threadIndex);
        });
        this.on("getTopLevelCallStackSources", function (data) {
            return _this.ide.getTopLevelCallStackSources(data.threadIndex, data.stackDepth);
        });
        this.on("getAvailableThreads", function () {
            return _this.ide.getAvailableThreads();
        });
        this.on("getTags", function (data) {
            return _this.ide.getTags(data);
        });
        this.on("getIdeInfo", function () {
            return _this.ide.getIdeInfo();
        });
        this.on("readRangeInFile", function (data) {
            return _this.ide.readRangeInFile(data.filepath, data.range);
        });
        this.on("isTelemetryEnabled", function () {
            return _this.ide.isTelemetryEnabled();
        });
        this.on("getUniqueId", function () {
            return _this.ide.getUniqueId();
        });
        this.on("getIdeSettings", function () {
            return _this.ide.getIdeSettings();
        });
        this.on("getDiff", function (data) {
            return _this.ide.getDiff(data.includeUnstaged);
        });
        this.on("getTerminalContents", function () {
            return _this.ide.getTerminalContents();
        });
        this.on("getWorkspaceDirs", function () {
            return _this.ide.getWorkspaceDirs();
        });
        this.on("showLines", function (data) {
            return _this.ide.showLines(data.filepath, data.startLine, data.endLine);
        });
        this.on("getControlPlaneSessionInfo", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Not supported in testing
                return [2 /*return*/, undefined];
            });
        }); });
        this.on("writeFile", function (data) {
            return _this.ide.writeFile(data.path, data.contents);
        });
        this.on("fileExists", function (data) {
            return _this.ide.fileExists(data.filepath);
        });
        this.on("showVirtualFile", function (data) {
            return _this.ide.showVirtualFile(data.name, data.content);
        });
        this.on("openFile", function (data) {
            return _this.ide.openFile(data.path);
        });
        this.on("runCommand", function (data) {
            return _this.ide.runCommand(data.command);
        });
        this.on("saveFile", function (data) {
            return _this.ide.saveFile(data.filepath);
        });
        this.on("readFile", function (data) {
            return _this.ide.readFile(data.filepath);
        });
        this.on("getOpenFiles", function () {
            return _this.ide.getOpenFiles();
        });
        this.on("getCurrentFile", function () {
            return _this.ide.getCurrentFile();
        });
        this.on("getPinnedFiles", function () {
            return _this.ide.getPinnedFiles();
        });
        this.on("getSearchResults", function (data) {
            return _this.ide.getSearchResults(data.query, data.maxResults);
        });
        this.on("getFileResults", function (data) {
            return _this.ide.getFileResults(data.pattern, data.maxResults);
        });
        this.on("getProblems", function (data) {
            return _this.ide.getProblems(data.filepath);
        });
        this.on("subprocess", function (data) {
            return _this.ide.subprocess(data.command, data.cwd);
        });
        this.on("getBranch", function (data) {
            return _this.ide.getBranch(data.dir);
        });
    };
    return ReverseMessageIde;
}());
exports.ReverseMessageIde = ReverseMessageIde;
