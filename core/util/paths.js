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
exports.isFileWithinFolder = exports.DEFAULT_CONFIG_TS_CONTENTS = void 0;
exports.getChromiumPath = getChromiumPath;
exports.getContinueUtilsPath = getContinueUtilsPath;
exports.getGlobalContinueIgnorePath = getGlobalContinueIgnorePath;
exports.getContinueGlobalPath = getContinueGlobalPath;
exports.getSessionsFolderPath = getSessionsFolderPath;
exports.getIndexFolderPath = getIndexFolderPath;
exports.getGlobalContextFilePath = getGlobalContextFilePath;
exports.getSharedConfigFilePath = getSharedConfigFilePath;
exports.getSessionFilePath = getSessionFilePath;
exports.getSessionsListPath = getSessionsListPath;
exports.getConfigJsonPath = getConfigJsonPath;
exports.getConfigYamlPath = getConfigYamlPath;
exports.getPrimaryConfigFilePath = getPrimaryConfigFilePath;
exports.getConfigTsPath = getConfigTsPath;
exports.getConfigJsPath = getConfigJsPath;
exports.getTsConfigPath = getTsConfigPath;
exports.getContinueRcPath = getContinueRcPath;
exports.getDevDataSqlitePath = getDevDataSqlitePath;
exports.getDevDataFilePath = getDevDataFilePath;
exports.editConfigFile = editConfigFile;
exports.migrate = migrate;
exports.getIndexSqlitePath = getIndexSqlitePath;
exports.getLanceDbPath = getLanceDbPath;
exports.getTabAutocompleteCacheSqlitePath = getTabAutocompleteCacheSqlitePath;
exports.getDocsSqlitePath = getDocsSqlitePath;
exports.getRemoteConfigsFolderPath = getRemoteConfigsFolderPath;
exports.getPathToRemoteConfig = getPathToRemoteConfig;
exports.getConfigJsonPathForRemote = getConfigJsonPathForRemote;
exports.getConfigJsPathForRemote = getConfigJsPathForRemote;
exports.getContinueDotEnv = getContinueDotEnv;
exports.getLogsDirPath = getLogsDirPath;
exports.getCoreLogsPath = getCoreLogsPath;
exports.getPromptLogsPath = getPromptLogsPath;
exports.getGlobalFolderWithName = getGlobalFolderWithName;
exports.getGlobalPromptsPath = getGlobalPromptsPath;
exports.readAllGlobalPromptFiles = readAllGlobalPromptFiles;
exports.getRepoMapFilePath = getRepoMapFilePath;
exports.getEsbuildBinaryPath = getEsbuildBinaryPath;
exports.migrateV1DevDataFiles = migrateV1DevDataFiles;
exports.getLocalEnvironmentDotFilePath = getLocalEnvironmentDotFilePath;
exports.getStagingEnvironmentDotFilePath = getStagingEnvironmentDotFilePath;
exports.getDiffsDirectoryPath = getDiffsDirectoryPath;
var fs = require("fs");
var os = require("os");
var path = require("path");
var URI = require("uri-js");
var YAML = require("yaml");
var JSONC = require("comment-json");
var dotenv_1 = require("dotenv");
var default_1 = require("../config/default");
var types_1 = require("../config/types");
dotenv_1.default.config();
var CONTINUE_GLOBAL_DIR = (function () {
    var configPath = process.env.CONTINUE_GLOBAL_DIR;
    if (configPath) {
        // Convert relative path to absolute paths based on current working directory
        return path.isAbsolute(configPath)
            ? configPath
            : path.resolve(process.cwd(), configPath);
    }
    return path.join(os.homedir(), ".continue");
})();
// export const DEFAULT_CONFIG_TS_CONTENTS = `import { Config } from "./types"\n\nexport function modifyConfig(config: Config): Config {
//   return config;
// }`;
exports.DEFAULT_CONFIG_TS_CONTENTS = "export function modifyConfig(config: Config): Config {\n  return config;\n}";
function getChromiumPath() {
    return path.join(getContinueUtilsPath(), ".chromium-browser-snapshots");
}
function getContinueUtilsPath() {
    var utilsPath = path.join(getContinueGlobalPath(), ".utils");
    if (!fs.existsSync(utilsPath)) {
        fs.mkdirSync(utilsPath);
    }
    return utilsPath;
}
function getGlobalContinueIgnorePath() {
    var continueIgnorePath = path.join(getContinueGlobalPath(), ".continueignore");
    if (!fs.existsSync(continueIgnorePath)) {
        fs.writeFileSync(continueIgnorePath, "");
    }
    return continueIgnorePath;
}
function getContinueGlobalPath() {
    // This is ~/.continue on mac/linux
    var continuePath = CONTINUE_GLOBAL_DIR;
    if (!fs.existsSync(continuePath)) {
        fs.mkdirSync(continuePath);
    }
    return continuePath;
}
function getSessionsFolderPath() {
    var sessionsPath = path.join(getContinueGlobalPath(), "sessions");
    if (!fs.existsSync(sessionsPath)) {
        fs.mkdirSync(sessionsPath);
    }
    return sessionsPath;
}
function getIndexFolderPath() {
    var indexPath = path.join(getContinueGlobalPath(), "index");
    if (!fs.existsSync(indexPath)) {
        fs.mkdirSync(indexPath);
    }
    return indexPath;
}
function getGlobalContextFilePath() {
    return path.join(getIndexFolderPath(), "globalContext.json");
}
function getSharedConfigFilePath() {
    return path.join(getContinueGlobalPath(), "sharedConfig.json");
}
function getSessionFilePath(sessionId) {
    return path.join(getSessionsFolderPath(), "".concat(sessionId, ".json"));
}
function getSessionsListPath() {
    var filepath = path.join(getSessionsFolderPath(), "sessions.json");
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, JSON.stringify([]));
    }
    return filepath;
}
function getConfigJsonPath() {
    var p = path.join(getContinueGlobalPath(), "config.json");
    return p;
}
function getConfigYamlPath(ideType) {
    var p = path.join(getContinueGlobalPath(), "config.yaml");
    if (!fs.existsSync(p) && !fs.existsSync(getConfigJsonPath())) {
        if (ideType === "jetbrains") {
            // https://github.com/continuedev/continue/pull/7224
            // This was here because we had different context provider support between jetbrains and vs code
            // Leaving so we could differentiate later but for now configs are the same between IDEs
            fs.writeFileSync(p, YAML.stringify(default_1.defaultConfig));
        }
        else {
            fs.writeFileSync(p, YAML.stringify(default_1.defaultConfig));
        }
    }
    return p;
}
function getPrimaryConfigFilePath() {
    var configYamlPath = getConfigYamlPath();
    if (fs.existsSync(configYamlPath)) {
        return configYamlPath;
    }
    return getConfigJsonPath();
}
function getConfigTsPath() {
    var p = path.join(getContinueGlobalPath(), "config.ts");
    if (!fs.existsSync(p)) {
        fs.writeFileSync(p, exports.DEFAULT_CONFIG_TS_CONTENTS);
    }
    var typesPath = path.join(getContinueGlobalPath(), "types");
    if (!fs.existsSync(typesPath)) {
        fs.mkdirSync(typesPath);
    }
    var corePath = path.join(typesPath, "core");
    if (!fs.existsSync(corePath)) {
        fs.mkdirSync(corePath);
    }
    var packageJsonPath = path.join(getContinueGlobalPath(), "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        fs.writeFileSync(packageJsonPath, JSON.stringify({
            name: "continue-config",
            version: "1.0.0",
            description: "My Continue Configuration",
            main: "config.js",
        }));
    }
    fs.writeFileSync(path.join(corePath, "index.d.ts"), types_1.default);
    return p;
}
function getConfigJsPath() {
    // Do not create automatically
    return path.join(getContinueGlobalPath(), "out", "config.js");
}
function getTsConfigPath() {
    var tsConfigPath = path.join(getContinueGlobalPath(), "tsconfig.json");
    if (!fs.existsSync(tsConfigPath)) {
        fs.writeFileSync(tsConfigPath, JSON.stringify({
            compilerOptions: {
                target: "ESNext",
                useDefineForClassFields: true,
                lib: ["DOM", "DOM.Iterable", "ESNext"],
                allowJs: true,
                skipLibCheck: true,
                esModuleInterop: false,
                allowSyntheticDefaultImports: true,
                strict: true,
                forceConsistentCasingInFileNames: true,
                module: "System",
                moduleResolution: "Node",
                noEmit: false,
                noEmitOnError: false,
                outFile: "./out/config.js",
                typeRoots: ["./node_modules/@types", "./types"],
            },
            include: ["./config.ts"],
        }, null, 2));
    }
    return tsConfigPath;
}
function getContinueRcPath() {
    // Disable indexing of the config folder to prevent infinite loops
    var continuercPath = path.join(getContinueGlobalPath(), ".continuerc.json");
    if (!fs.existsSync(continuercPath)) {
        fs.writeFileSync(continuercPath, JSON.stringify({
            disableIndexing: true,
        }, null, 2));
    }
    return continuercPath;
}
function getDevDataPath() {
    var sPath = path.join(getContinueGlobalPath(), "dev_data");
    if (!fs.existsSync(sPath)) {
        fs.mkdirSync(sPath);
    }
    return sPath;
}
function getDevDataSqlitePath() {
    return path.join(getDevDataPath(), "devdata.sqlite");
}
function getDevDataFilePath(eventName, schema) {
    var versionPath = path.join(getDevDataPath(), schema);
    if (!fs.existsSync(versionPath)) {
        fs.mkdirSync(versionPath);
    }
    return path.join(versionPath, "".concat(String(eventName), ".jsonl"));
}
function editConfigJson(callback) {
    var config = fs.readFileSync(getConfigJsonPath(), "utf8");
    var configJson = JSONC.parse(config);
    // Check if it's an object
    if (typeof configJson === "object" && configJson !== null) {
        configJson = callback(configJson);
        fs.writeFileSync(getConfigJsonPath(), JSONC.stringify(configJson, null, 2));
    }
    else {
        console.warn("config.json is not a valid object");
    }
}
function editConfigYaml(callback) {
    var config = fs.readFileSync(getConfigYamlPath(), "utf8");
    var configYaml = YAML.parse(config);
    // Check if it's an object
    if (typeof configYaml === "object" && configYaml !== null) {
        configYaml = callback(configYaml);
        fs.writeFileSync(getConfigYamlPath(), YAML.stringify(configYaml));
    }
    else {
        console.warn("config.yaml is not a valid object");
    }
}
function editConfigFile(configJsonCallback, configYamlCallback) {
    if (fs.existsSync(getConfigYamlPath())) {
        editConfigYaml(configYamlCallback);
    }
    else if (fs.existsSync(getConfigJsonPath())) {
        editConfigJson(configJsonCallback);
    }
}
function getMigrationsFolderPath() {
    var migrationsPath = path.join(getContinueGlobalPath(), ".migrations");
    if (!fs.existsSync(migrationsPath)) {
        fs.mkdirSync(migrationsPath);
    }
    return migrationsPath;
}
function migrate(id, callback, onAlreadyComplete) {
    return __awaiter(this, void 0, void 0, function () {
        var migrationsPath, migrationPath, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(process.env.NODE_ENV === "test")) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve(callback())];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    migrationsPath = getMigrationsFolderPath();
                    migrationPath = path.join(migrationsPath, id);
                    if (!!fs.existsSync(migrationPath)) return [3 /*break*/, 7];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    console.log("Running migration: ".concat(id));
                    fs.writeFileSync(migrationPath, "");
                    return [4 /*yield*/, Promise.resolve(callback())];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.warn("Migration ".concat(id, " failed"), e_1);
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    if (onAlreadyComplete) {
                        onAlreadyComplete();
                    }
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function getIndexSqlitePath() {
    return path.join(getIndexFolderPath(), "index.sqlite");
}
function getLanceDbPath() {
    return path.join(getIndexFolderPath(), "lancedb");
}
function getTabAutocompleteCacheSqlitePath() {
    return path.join(getIndexFolderPath(), "autocompleteCache.sqlite");
}
function getDocsSqlitePath() {
    return path.join(getIndexFolderPath(), "docs.sqlite");
}
function getRemoteConfigsFolderPath() {
    var dir = path.join(getContinueGlobalPath(), ".configs");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return dir;
}
function getPathToRemoteConfig(remoteConfigServerUrl) {
    var _a;
    var url = undefined;
    try {
        url =
            typeof remoteConfigServerUrl !== "string" || remoteConfigServerUrl === ""
                ? undefined
                : new URL(remoteConfigServerUrl);
    }
    catch (e) { }
    var dir = path.join(getRemoteConfigsFolderPath(), (_a = url === null || url === void 0 ? void 0 : url.hostname) !== null && _a !== void 0 ? _a : "None");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return dir;
}
function getConfigJsonPathForRemote(remoteConfigServerUrl) {
    return path.join(getPathToRemoteConfig(remoteConfigServerUrl), "config.json");
}
function getConfigJsPathForRemote(remoteConfigServerUrl) {
    return path.join(getPathToRemoteConfig(remoteConfigServerUrl), "config.js");
}
function getContinueDotEnv() {
    var filepath = path.join(getContinueGlobalPath(), ".env");
    if (fs.existsSync(filepath)) {
        return dotenv_1.default.parse(fs.readFileSync(filepath));
    }
    return {};
}
function getLogsDirPath() {
    var logsPath = path.join(getContinueGlobalPath(), "logs");
    if (!fs.existsSync(logsPath)) {
        fs.mkdirSync(logsPath);
    }
    return logsPath;
}
function getCoreLogsPath() {
    return path.join(getLogsDirPath(), "core.log");
}
function getPromptLogsPath() {
    return path.join(getLogsDirPath(), "prompt.log");
}
function getGlobalFolderWithName(name) {
    return path.join(getContinueGlobalPath(), name);
}
function getGlobalPromptsPath() {
    return getGlobalFolderWithName("prompts");
}
function readAllGlobalPromptFiles(folderPath) {
    if (folderPath === void 0) { folderPath = getGlobalPromptsPath(); }
    if (!fs.existsSync(folderPath)) {
        return [];
    }
    var files = fs.readdirSync(folderPath);
    var promptFiles = [];
    files.forEach(function (file) {
        var filepath = path.join(folderPath, file);
        var stats = fs.statSync(filepath);
        if (stats.isDirectory()) {
            var nestedPromptFiles = readAllGlobalPromptFiles(filepath);
            promptFiles.push.apply(promptFiles, nestedPromptFiles);
        }
        else if (file.endsWith(".prompt")) {
            var content = fs.readFileSync(filepath, "utf8");
            promptFiles.push({ path: filepath, content: content });
        }
    });
    return promptFiles;
}
function getRepoMapFilePath() {
    return path.join(getContinueUtilsPath(), "repo_map.txt");
}
function getEsbuildBinaryPath() {
    return path.join(getContinueUtilsPath(), "esbuild");
}
function migrateV1DevDataFiles() {
    var devDataPath = getDevDataPath();
    function moveToV1FolderIfExists(oldFileName, newFileName) {
        var oldFilePath = path.join(devDataPath, "".concat(oldFileName, ".jsonl"));
        if (fs.existsSync(oldFilePath)) {
            var newFilePath = getDevDataFilePath(newFileName, "0.1.0");
            if (!fs.existsSync(newFilePath)) {
                fs.copyFileSync(oldFilePath, newFilePath);
                fs.unlinkSync(oldFilePath);
            }
        }
    }
    moveToV1FolderIfExists("tokens_generated", "tokensGenerated");
    moveToV1FolderIfExists("chat", "chatFeedback");
    moveToV1FolderIfExists("quickEdit", "quickEdit");
    moveToV1FolderIfExists("autocomplete", "autocomplete");
}
function getLocalEnvironmentDotFilePath() {
    return path.join(getContinueGlobalPath(), ".local");
}
function getStagingEnvironmentDotFilePath() {
    return path.join(getContinueGlobalPath(), ".staging");
}
function getDiffsDirectoryPath() {
    var diffsPath = path.join(getContinueGlobalPath(), ".diffs"); // .replace(/^C:/, "c:"); ??
    if (!fs.existsSync(diffsPath)) {
        fs.mkdirSync(diffsPath, {
            recursive: true,
        });
    }
    return diffsPath;
}
var isFileWithinFolder = function (fileUri, folderPath) {
    try {
        if (!fileUri || !folderPath) {
            return false;
        }
        var fileUriParsed = URI.parse(fileUri);
        var fileScheme = fileUriParsed.scheme || "file";
        var filePath = fileUriParsed.path || "";
        filePath = decodeURIComponent(filePath);
        var folderWithScheme = folderPath;
        if (!folderPath.includes("://")) {
            folderWithScheme = "".concat(fileScheme, "://").concat(folderPath.startsWith("/") ? "" : "/").concat(folderPath);
        }
        var folderUriParsed = URI.parse(folderWithScheme);
        var folderPathClean = folderUriParsed.path || "";
        folderPathClean = decodeURIComponent(folderPathClean);
        filePath = filePath.replace(/\/$/, "");
        folderPathClean = folderPathClean.replace(/\/$/, "");
        return (filePath === folderPathClean || filePath.startsWith("".concat(folderPathClean, "/")));
    }
    catch (error) {
        console.error("Error in isFileWithinFolder:", error);
        return false;
    }
};
exports.isFileWithinFolder = isFileWithinFolder;
