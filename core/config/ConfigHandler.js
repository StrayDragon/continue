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
exports.ConfigHandler = void 0;
var client_js_1 = require("../control-plane/client.js");
var GlobalContext_js_1 = require("../util/GlobalContext.js");
var node_events_1 = require("node:events");
var AuthTypes_js_1 = require("../control-plane/AuthTypes.js");
var env_js_1 = require("../control-plane/env.js");
var PolicySingleton_js_1 = require("../control-plane/PolicySingleton.js");
var Logger_js_1 = require("../util/Logger.js");
var posthog_js_1 = require("../util/posthog.js");
var loadLocalAssistants_js_1 = require("./loadLocalAssistants.js");
var LocalProfileLoader_js_1 = require("./profile/LocalProfileLoader.js");
var PlatformProfileLoader_js_1 = require("./profile/PlatformProfileLoader.js");
var ProfileLifecycleManager_js_1 = require("./ProfileLifecycleManager.js");
var ConfigHandler = /** @class */ (function () {
    function ConfigHandler(ide, llmLogger, initialSessionInfoPromise) {
        var _this = this;
        this.ide = ide;
        this.llmLogger = llmLogger;
        this.globalContext = new GlobalContext_js_1.GlobalContext();
        this.organizations = [];
        this.totalConfigReloads = 0;
        this.workspaceDirs = null;
        this.PERSONAL_ORG_DESC = {
            iconUrl: "",
            id: "personal",
            name: "Personal",
            slug: undefined,
        };
        this.updateListeners = [];
        // Ancient method of adding custom providers through vs code
        this.additionalContextProviders = [];
        this.controlPlaneClient = new client_js_1.ControlPlaneClient(initialSessionInfoPromise, this.ide);
        // This profile manager will always be available
        this.globalLocalProfileManager = new ProfileLifecycleManager_js_1.ProfileLifecycleManager(new LocalProfileLoader_js_1.default(ide, this.controlPlaneClient, this.llmLogger), this.ide);
        this.currentOrg = null;
        this.currentProfile = null;
        this.organizations = [];
        this.initter = new node_events_1.default();
        this.isInitialized = new Promise(function (resolve) {
            _this.initter.on("init", resolve);
        });
        this.cascadeAbortController = new AbortController();
        void this.cascadeInit("Config handler initialization");
    }
    ConfigHandler.prototype.abortCascade = function () {
        this.cascadeAbortController.abort();
        this.cascadeAbortController = new AbortController();
    };
    ConfigHandler.prototype.getWorkspaceId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.workspaceDirs) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.ide.getWorkspaceDirs()];
                    case 1:
                        _a.workspaceDirs = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.workspaceDirs.join("&")];
                }
            });
        });
    };
    ConfigHandler.prototype.getProfileKey = function (orgId) {
        return __awaiter(this, void 0, void 0, function () {
            var workspaceId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWorkspaceId()];
                    case 1:
                        workspaceId = _a.sent();
                        return [2 /*return*/, "".concat(workspaceId, ":::").concat(orgId)];
                }
            });
        });
    };
    ConfigHandler.prototype.cascadeInit = function (reason) {
        return __awaiter(this, void 0, void 0, function () {
            var signal, _a, orgs, errors, workspaceId, selectedOrgs, currentSelection_1, firstNonPersonal, fallback, selectedOrg, match, e_1;
            var _b;
            var _this = this;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        signal = this.cascadeAbortController.signal;
                        this.workspaceDirs = null; // forces workspace dirs reload
                        // Always update globalLocalProfileManager before recreating all the loaders
                        // during every cascadeInit so it holds the most recent controlPlaneClient.
                        this.globalLocalProfileManager = new ProfileLifecycleManager_js_1.ProfileLifecycleManager(new LocalProfileLoader_js_1.default(this.ide, this.controlPlaneClient, this.llmLogger), this.ide);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.getOrgs()];
                    case 2:
                        _a = _e.sent(), orgs = _a.orgs, errors = _a.errors;
                        return [4 /*yield*/, this.getWorkspaceId()];
                    case 3:
                        workspaceId = _e.sent();
                        selectedOrgs = (_c = this.globalContext.get("lastSelectedOrgIdForWorkspace")) !== null && _c !== void 0 ? _c : {};
                        currentSelection_1 = selectedOrgs[workspaceId];
                        firstNonPersonal = orgs.find(function (org) { return org.id !== _this.PERSONAL_ORG_DESC.id; });
                        fallback = (_d = firstNonPersonal !== null && firstNonPersonal !== void 0 ? firstNonPersonal : orgs[0]) !== null && _d !== void 0 ? _d : null;
                        selectedOrg = void 0;
                        if (currentSelection_1) {
                            match = orgs.find(function (org) { return org.id === currentSelection_1; });
                            if (match) {
                                selectedOrg = match;
                            }
                            else {
                                selectedOrg = fallback;
                            }
                        }
                        else {
                            selectedOrg = fallback;
                        }
                        if (signal.aborted) {
                            return [2 /*return*/]; // local only case, no`fetch to throw abort error
                        }
                        this.globalContext.update("lastSelectedOrgIdForWorkspace", __assign(__assign({}, selectedOrgs), (_b = {}, _b[workspaceId] = selectedOrg === null || selectedOrg === void 0 ? void 0 : selectedOrg.id, _b)));
                        this.organizations = orgs;
                        this.currentOrg = selectedOrg;
                        this.currentProfile = selectedOrg === null || selectedOrg === void 0 ? void 0 : selectedOrg.currentProfile;
                        return [4 /*yield*/, this.reloadConfig(reason, errors)];
                    case 4:
                        _e.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _e.sent();
                        if (signal.aborted) {
                            return [2 /*return*/];
                        }
                        else {
                            this.initter.emit("init"); // Error case counts as init
                            throw e_1;
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ConfigHandler.prototype.getOrgs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errors, isSignedIn, policyResponse_1, orgDescriptions, orgsWithPolicy, firstOrg, orgs, e_2, orgs, e_3;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        errors = [];
                        return [4 /*yield*/, this.controlPlaneClient.isSignedIn()];
                    case 1:
                        isSignedIn = _b.sent();
                        if (!isSignedIn) return [3 /*break*/, 11];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 9, , 10]);
                        return [4 /*yield*/, this.controlPlaneClient.getPolicy()];
                    case 3:
                        policyResponse_1 = _b.sent();
                        PolicySingleton_js_1.PolicySingleton.getInstance().policy = policyResponse_1;
                        return [4 /*yield*/, this.controlPlaneClient.listOrganizations()];
                    case 4:
                        orgDescriptions = _b.sent();
                        orgsWithPolicy = orgDescriptions.map(function (d) { return (__assign(__assign({}, d), { policy: policyResponse_1 === null || policyResponse_1 === void 0 ? void 0 : policyResponse_1.policy })); });
                        if (!(((_a = policyResponse_1 === null || policyResponse_1 === void 0 ? void 0 : policyResponse_1.policy) === null || _a === void 0 ? void 0 : _a.allowOtherOrgs) === false)) return [3 /*break*/, 7];
                        if (!(orgsWithPolicy.length === 0)) return [3 /*break*/, 5];
                        return [2 /*return*/, { orgs: [] }];
                    case 5: return [4 /*yield*/, this.getNonPersonalHubOrg(orgsWithPolicy[0])];
                    case 6:
                        firstOrg = _b.sent();
                        return [2 /*return*/, { orgs: [firstOrg] }];
                    case 7: return [4 /*yield*/, Promise.all(__spreadArray([
                            this.getPersonalHubOrg()
                        ], orgsWithPolicy.map(function (org) { return _this.getNonPersonalHubOrg(org); }), true))];
                    case 8:
                        orgs = _b.sent();
                        // TODO make try/catch more granular here, to catch specific org errors
                        return [2 /*return*/, { orgs: orgs }];
                    case 9:
                        e_2 = _b.sent();
                        errors.push({
                            fatal: false,
                            message: "Error loading Continue Hub assistants".concat(e_2 instanceof Error ? ":\n" + e_2.message : ""),
                        });
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        PolicySingleton_js_1.PolicySingleton.getInstance().policy = null;
                        _b.label = 12;
                    case 12:
                        _b.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, this.getLocalOrg()];
                    case 13:
                        orgs = [_b.sent()];
                        return [2 /*return*/, { orgs: orgs }];
                    case 14:
                        e_3 = _b.sent();
                        errors.push({
                            fatal: true,
                            message: "Error loading local assistants".concat(e_3 instanceof Error ? ":\n" + e_3.message : ""),
                        });
                        return [2 /*return*/, {
                                orgs: [],
                                errors: errors,
                            }];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    ConfigHandler.prototype.getSerializedOrgs = function () {
        return this.organizations.map(function (org) {
            var _a;
            return ({
                iconUrl: org.iconUrl,
                id: org.id,
                name: org.name,
                slug: org.slug,
                profiles: org.profiles.map(function (profile) { return profile.profileDescription; }),
                selectedProfileId: ((_a = org.currentProfile) === null || _a === void 0 ? void 0 : _a.profileDescription.id) || null,
            });
        });
    };
    ConfigHandler.prototype.getHubProfiles = function (orgScopeId) {
        return __awaiter(this, void 0, void 0, function () {
            var assistants;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controlPlaneClient.listAssistants(orgScopeId)];
                    case 1:
                        assistants = _a.sent();
                        return [4 /*yield*/, Promise.all(assistants.map(function (assistant) { return __awaiter(_this, void 0, void 0, function () {
                                var profileLoader;
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, PlatformProfileLoader_js_1.default.create({
                                                configResult: __assign(__assign({}, assistant.configResult), { config: assistant.configResult.config }),
                                                ownerSlug: assistant.ownerSlug,
                                                packageSlug: assistant.packageSlug,
                                                iconUrl: assistant.iconUrl,
                                                versionSlug: (_b = (_a = assistant.configResult.config) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : "latest",
                                                controlPlaneClient: this.controlPlaneClient,
                                                ide: this.ide,
                                                llmLogger: this.llmLogger,
                                                rawYaml: assistant.rawYaml,
                                                orgScopeId: orgScopeId,
                                            })];
                                        case 1:
                                            profileLoader = _c.sent();
                                            return [2 /*return*/, new ProfileLifecycleManager_js_1.ProfileLifecycleManager(profileLoader, this.ide)];
                                    }
                                });
                            }); }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConfigHandler.prototype.getNonPersonalHubOrg = function (org) {
        return __awaiter(this, void 0, void 0, function () {
            var localProfiles, profiles, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getLocalProfiles({
                            includeGlobal: false,
                            includeWorkspace: true,
                        })];
                    case 1:
                        localProfiles = _b.sent();
                        _a = [[]];
                        return [4 /*yield*/, this.getHubProfiles(org.id)];
                    case 2:
                        profiles = __spreadArray.apply(void 0, [__spreadArray.apply(void 0, _a.concat([(_b.sent()), true])), localProfiles, true]);
                        return [2 /*return*/, this.rectifyProfilesForOrg(org, profiles)];
                }
            });
        });
    };
    ConfigHandler.prototype.getPersonalHubOrg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localProfiles, hubProfiles, profiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLocalProfiles({
                            includeGlobal: true,
                            includeWorkspace: true,
                        })];
                    case 1:
                        localProfiles = _a.sent();
                        return [4 /*yield*/, this.getHubProfiles(null)];
                    case 2:
                        hubProfiles = _a.sent();
                        profiles = __spreadArray(__spreadArray([], hubProfiles, true), localProfiles, true);
                        return [2 /*return*/, this.rectifyProfilesForOrg(this.PERSONAL_ORG_DESC, profiles)];
                }
            });
        });
    };
    ConfigHandler.prototype.getLocalOrg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localProfiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLocalProfiles({
                            includeGlobal: true,
                            includeWorkspace: true,
                        })];
                    case 1:
                        localProfiles = _a.sent();
                        return [2 /*return*/, this.rectifyProfilesForOrg(this.PERSONAL_ORG_DESC, localProfiles)];
                }
            });
        });
    };
    ConfigHandler.prototype.rectifyProfilesForOrg = function (org, profiles) {
        return __awaiter(this, void 0, void 0, function () {
            var profileKey, selectedProfiles, currentSelection, firstNonLocal, fallback, currentProfile, match;
            var _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getProfileKey(org.id)];
                    case 1:
                        profileKey = _c.sent();
                        selectedProfiles = (_b = this.globalContext.get("lastSelectedProfileForWorkspace")) !== null && _b !== void 0 ? _b : {};
                        currentSelection = selectedProfiles[profileKey];
                        firstNonLocal = profiles.find(function (profile) { return profile.profileDescription.profileType !== "local"; });
                        fallback = firstNonLocal !== null && firstNonLocal !== void 0 ? firstNonLocal : (profiles.length > 0 ? profiles[0] : null);
                        if (currentSelection) {
                            match = profiles.find(function (profile) { return profile.profileDescription.id === currentSelection; });
                            if (match) {
                                currentProfile = match;
                            }
                            else {
                                currentProfile = fallback;
                            }
                        }
                        else {
                            currentProfile = fallback;
                        }
                        if (currentProfile) {
                            this.globalContext.update("lastSelectedProfileForWorkspace", __assign(__assign({}, selectedProfiles), (_a = {}, _a[profileKey] = currentProfile.profileDescription.id, _a)));
                        }
                        return [2 /*return*/, __assign(__assign({}, org), { profiles: profiles, currentProfile: currentProfile })];
                }
            });
        });
    };
    ConfigHandler.prototype.getLocalProfiles = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var env, localProfiles, assistantFiles, agentFiles, profiles, localAssistantProfiles;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, env_js_1.getControlPlaneEnv)(this.ide.getIdeSettings())];
                    case 1:
                        env = _a.sent();
                        if (env.AUTH_TYPE === AuthTypes_js_1.AuthType.OnPrem) {
                            return [2 /*return*/, []];
                        }
                        localProfiles = [];
                        if (options.includeGlobal) {
                            localProfiles.push(this.globalLocalProfileManager);
                        }
                        if (!options.includeWorkspace) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, loadLocalAssistants_js_1.getAllDotContinueDefinitionFiles)(this.ide, options, "assistants")];
                    case 2:
                        assistantFiles = _a.sent();
                        return [4 /*yield*/, (0, loadLocalAssistants_js_1.getAllDotContinueDefinitionFiles)(this.ide, options, "agents")];
                    case 3:
                        agentFiles = _a.sent();
                        profiles = __spreadArray(__spreadArray([], assistantFiles, true), agentFiles, true).map(function (assistant) {
                            return new LocalProfileLoader_js_1.default(_this.ide, _this.controlPlaneClient, _this.llmLogger, assistant);
                        });
                        localAssistantProfiles = profiles.map(function (profile) { return new ProfileLifecycleManager_js_1.ProfileLifecycleManager(profile, _this.ide); });
                        localProfiles.push.apply(localProfiles, localAssistantProfiles);
                        _a.label = 4;
                    case 4: return [2 /*return*/, localProfiles];
                }
            });
        });
    };
    //////////////////
    // External actions that can cause a cascading config refresh
    // Should not be used internally
    //////////////////
    ConfigHandler.prototype.refreshAll = function (reason) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cascadeInit(reason !== null && reason !== void 0 ? reason : "External refresh all")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Ide settings change: refresh session and cascade refresh from the top
    ConfigHandler.prototype.updateIdeSettings = function (ideSettings) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.abortCascade();
                        return [4 /*yield*/, this.cascadeInit("IDE settings update")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Session change: refresh session and cascade refresh from the top
    ConfigHandler.prototype.updateControlPlaneSessionInfo = function (sessionInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var currentSession, newSession, reload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.controlPlaneClient.sessionInfoPromise];
                    case 1:
                        currentSession = _a.sent();
                        newSession = sessionInfo;
                        reload = false;
                        if (newSession) {
                            if (currentSession) {
                                if (newSession.AUTH_TYPE !== AuthTypes_js_1.AuthType.OnPrem &&
                                    currentSession.AUTH_TYPE !== AuthTypes_js_1.AuthType.OnPrem) {
                                    if (newSession.account.id !== currentSession.account.id) {
                                        // session id change (non-on-prem)
                                        reload = true;
                                    }
                                }
                            }
                            else {
                                // log in
                                reload = true;
                            }
                        }
                        else {
                            if (currentSession) {
                                // log out
                                reload = true;
                            }
                        }
                        if (!reload) return [3 /*break*/, 3];
                        this.controlPlaneClient = new client_js_1.ControlPlaneClient(Promise.resolve(sessionInfo), this.ide);
                        this.abortCascade();
                        return [4 /*yield*/, this.cascadeInit("Control plane session info update")];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, reload];
                }
            });
        });
    };
    // Org id: check id validity, save selection, switch and reload
    ConfigHandler.prototype.setSelectedOrgId = function (orgId, profileId) {
        return __awaiter(this, void 0, void 0, function () {
            var org, workspaceId, selectedOrgs;
            var _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (orgId === ((_b = this.currentOrg) === null || _b === void 0 ? void 0 : _b.id)) {
                            return [2 /*return*/];
                        }
                        org = this.organizations.find(function (org) { return org.id === orgId; });
                        if (!org) {
                            throw new Error("Org ".concat(orgId, " not found"));
                        }
                        return [4 /*yield*/, this.getWorkspaceId()];
                    case 1:
                        workspaceId = _d.sent();
                        selectedOrgs = (_c = this.globalContext.get("lastSelectedOrgIdForWorkspace")) !== null && _c !== void 0 ? _c : {};
                        this.globalContext.update("lastSelectedOrgIdForWorkspace", __assign(__assign({}, selectedOrgs), (_a = {}, _a[workspaceId] = org.id, _a)));
                        this.currentOrg = org;
                        if (!profileId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.setSelectedProfileId(profileId)];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        this.currentProfile = org.currentProfile;
                        return [4 /*yield*/, this.reloadConfig("Selected org changed")];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Profile id: check id validity, save selection, switch and reload
    ConfigHandler.prototype.setSelectedProfileId = function (profileId) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, profileKey, selectedProfiles;
            var _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.currentOrg) {
                            throw new Error("No org selected");
                        }
                        if (this.currentProfile &&
                            profileId === this.currentProfile.profileDescription.id) {
                            return [2 /*return*/];
                        }
                        profile = this.currentOrg.profiles.find(function (profile) { return profile.profileDescription.id === profileId; });
                        if (!profile) {
                            throw new Error("Profile ".concat(profileId, " not found in current org"));
                        }
                        return [4 /*yield*/, this.getProfileKey(this.currentOrg.id)];
                    case 1:
                        profileKey = _c.sent();
                        selectedProfiles = (_b = this.globalContext.get("lastSelectedProfileForWorkspace")) !== null && _b !== void 0 ? _b : {};
                        this.globalContext.update("lastSelectedProfileForWorkspace", __assign(__assign({}, selectedProfiles), (_a = {}, _a[profileKey] = profileId, _a)));
                        this.currentProfile = profile;
                        return [4 /*yield*/, this.reloadConfig("Selected profile changed")];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Bottom level of cascade: refresh the current profile
    // IMPORTANT - must always refresh when switching profiles
    // Because of e.g. MCP singleton and docs service using things from config
    // Could improve this
    ConfigHandler.prototype.reloadConfig = function (reason, injectErrors) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, _i, _a, org, _b, _c, profile, _d, config, _e, errors, configLoadInterrupted, endTime, duration, isSignedIn, profileDescription, telemetryData;
            var _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        startTime = performance.now();
                        this.totalConfigReloads += 1;
                        // console.log(`Reloading config (#${this.totalConfigLoads}): ${reason}`); // Uncomment to see config loading logs
                        if (!this.currentProfile) {
                            return [2 /*return*/, {
                                    config: undefined,
                                    errors: injectErrors,
                                    configLoadInterrupted: true,
                                }];
                        }
                        for (_i = 0, _a = this.organizations; _i < _a.length; _i++) {
                            org = _a[_i];
                            for (_b = 0, _c = org.profiles; _b < _c.length; _b++) {
                                profile = _c[_b];
                                if (profile.profileDescription.id !==
                                    this.currentProfile.profileDescription.id) {
                                    profile.clearConfig();
                                }
                            }
                        }
                        return [4 /*yield*/, this.currentProfile.reloadConfig(this.additionalContextProviders)];
                    case 1:
                        _d = _g.sent(), config = _d.config, _e = _d.errors, errors = _e === void 0 ? [] : _e, configLoadInterrupted = _d.configLoadInterrupted;
                        if (injectErrors) {
                            errors.unshift.apply(errors, injectErrors);
                        }
                        this.notifyConfigListeners({ config: config, errors: errors, configLoadInterrupted: configLoadInterrupted });
                        this.initter.emit("init");
                        endTime = performance.now();
                        duration = endTime - startTime;
                        return [4 /*yield*/, this.controlPlaneClient.isSignedIn()];
                    case 2:
                        isSignedIn = _g.sent();
                        profileDescription = this.currentProfile.profileDescription;
                        telemetryData = {
                            duration: duration,
                            reason: reason,
                            totalConfigLoads: this.totalConfigReloads,
                            configLoadInterrupted: configLoadInterrupted,
                            profileType: profileDescription.profileType,
                            isPersonalOrg: ((_f = this.currentOrg) === null || _f === void 0 ? void 0 : _f.id) === this.PERSONAL_ORG_DESC.id,
                            errorCount: errors.length,
                            isSignedIn: isSignedIn,
                        };
                        void posthog_js_1.Telemetry.capture("config_reload", telemetryData);
                        return [2 /*return*/, {
                                config: config,
                                errors: errors.length ? errors : undefined,
                                configLoadInterrupted: configLoadInterrupted,
                            }];
                }
            });
        });
    };
    // Listeners setup - can listen to current profile updates
    ConfigHandler.prototype.notifyConfigListeners = function (result) {
        for (var _i = 0, _a = this.updateListeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(result);
        }
    };
    ConfigHandler.prototype.onConfigUpdate = function (listener) {
        this.updateListeners.push(listener);
    };
    // Methods for loading (without reloading) config
    // Serialized for passing to GUI
    // Load for just awaiting current config load promise for the profile
    ConfigHandler.prototype.getSerializedConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.currentProfile) {
                            return [2 /*return*/, {
                                    config: undefined,
                                    errors: undefined,
                                    configLoadInterrupted: true,
                                }];
                        }
                        return [4 /*yield*/, this.currentProfile.getSerializedConfig(this.additionalContextProviders)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConfigHandler.prototype.loadConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.currentProfile) {
                            return [2 /*return*/, {
                                    config: undefined,
                                    errors: undefined,
                                    configLoadInterrupted: true,
                                }];
                        }
                        return [4 /*yield*/, this.isInitialized];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.currentProfile.loadConfig(this.additionalContextProviders)];
                    case 2:
                        config = _b.sent();
                        if ((_a = config.errors) === null || _a === void 0 ? void 0 : _a.length) {
                            Logger_js_1.Logger.error("Errors loading config: ", config.errors);
                        }
                        return [2 /*return*/, config];
                }
            });
        });
    };
    ConfigHandler.prototype.openConfigProfile = function (profileId, element) {
        return __awaiter(this, void 0, void 0, function () {
            var openProfileId, profile, configFile, env;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        openProfileId = profileId || ((_a = this.currentProfile) === null || _a === void 0 ? void 0 : _a.profileDescription.id);
                        if (!openProfileId) {
                            return [2 /*return*/];
                        }
                        profile = (_b = this.currentOrg) === null || _b === void 0 ? void 0 : _b.profiles.find(function (p) { return p.profileDescription.id === openProfileId; });
                        if (!profile) {
                            console.error("Profile ".concat(profileId, " not found"));
                            return [2 /*return*/];
                        }
                        if (!(profile.profileDescription.profileType === "local")) return [3 /*break*/, 2];
                        configFile = (_c = element === null || element === void 0 ? void 0 : element.sourceFile) !== null && _c !== void 0 ? _c : profile.profileDescription.uri;
                        return [4 /*yield*/, this.ide.openFile(configFile)];
                    case 1:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, (0, env_js_1.getControlPlaneEnv)(this.ide.getIdeSettings())];
                    case 3:
                        env = _d.sent();
                        return [4 /*yield*/, this.ide.openUrl("".concat(env.APP_URL).concat(openProfileId))];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ConfigHandler.prototype.registerCustomContextProvider = function (contextProvider) {
        this.additionalContextProviders.push(contextProvider);
        void this.reloadConfig("Custom context provider registered");
    };
    /**
     * Retrieves the titles of additional context providers that are of type "submenu".
     *
     * @returns {string[]} An array of titles of the additional context providers that have a description type of "submenu".
     */
    ConfigHandler.prototype.getAdditionalSubmenuContextProviders = function () {
        return this.additionalContextProviders
            .filter(function (provider) { return provider.description.type === "submenu"; })
            .map(function (provider) { return provider.description.title; });
    };
    return ConfigHandler;
}());
exports.ConfigHandler = ConfigHandler;
