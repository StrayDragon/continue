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
exports.getLocationsToLook = getLocationsToLook;
exports.listAvailableSecrets = listAvailableSecrets;
exports.resolveFQSN = resolveFQSN;
var SecretResult_js_1 = require("./SecretResult.js");
var slugs_js_1 = require("./slugs.js");
function getLocationsToLook(assistantSlug, blockSlug, currentUserSlug, secretName, orgScopeSlug) {
    var locationsToLook = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], (blockSlug
        ? [
            // Models Add-On
            {
                secretType: SecretResult_js_1.SecretType.ModelsAddOn,
                secretName: secretName,
                blockSlug: blockSlug,
            },
            // Block
            {
                secretType: SecretResult_js_1.SecretType.Package,
                packageSlug: blockSlug,
                secretName: secretName,
            },
        ]
        : []), true), [
        // Assistant
        {
            secretType: SecretResult_js_1.SecretType.Package,
            packageSlug: assistantSlug,
            secretName: secretName,
        }
    ], false), (orgScopeSlug
        ? [
            {
                secretType: SecretResult_js_1.SecretType.Organization,
                orgSlug: orgScopeSlug,
                secretName: secretName,
            },
        ]
        : []), true), [
        // User
        {
            secretType: SecretResult_js_1.SecretType.User,
            userSlug: currentUserSlug,
            secretName: secretName,
        }
    ], false), (blockSlug
        ? [
            {
                secretType: SecretResult_js_1.SecretType.FreeTrial,
                secretName: secretName,
                blockSlug: blockSlug,
            },
        ]
        : []), true);
    return locationsToLook;
}
function listAvailableSecrets(userSecretNames, orgSecretNames, assistantSecretNames, blockSecretNames, assistantSlug, blockSlug, currentUserSlug, orgScopeSlug) {
    // Create a set of all secret names
    var allSecretNames = new Set(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], userSecretNames, true), orgSecretNames, true), assistantSecretNames, true), blockSecretNames, true));
    // Use the resolution order to get a single SecretLocation for each secret name
    var secretLocations = [];
    for (var _i = 0, allSecretNames_1 = allSecretNames; _i < allSecretNames_1.length; _i++) {
        var secretName = allSecretNames_1[_i];
        // Get the order of places to look
        var locationsToLook = getLocationsToLook(assistantSlug, blockSlug, currentUserSlug, secretName, orgScopeSlug);
        var _loop_1 = function (secretLocation) {
            // "Looking in a location" in this case means looking through one of the lists of secret names
            // First we get that list of secret names
            var secretNamesList = [];
            switch (secretLocation.secretType) {
                case SecretResult_js_1.SecretType.User:
                    secretNamesList = userSecretNames;
                    break;
                case SecretResult_js_1.SecretType.Organization:
                    secretNamesList = orgSecretNames;
                    break;
                case SecretResult_js_1.SecretType.Package:
                    if ((0, slugs_js_1.packageSlugsEqual)(secretLocation.packageSlug, assistantSlug)) {
                        secretNamesList = assistantSecretNames;
                    }
                    else if (blockSlug &&
                        (0, slugs_js_1.packageSlugsEqual)(secretLocation.packageSlug, blockSlug)) {
                        secretNamesList = blockSecretNames;
                    }
                    break;
            }
            // Then we look through that list for the matching secret name
            if (secretNamesList) {
                var matchingSecretName = secretNamesList.find(function (secretName) { return secretName === secretLocation.secretName; });
                if (matchingSecretName) {
                    // If we find a matching secret name, we add the location to the list
                    secretLocations.push(secretLocation);
                    return "break";
                }
            }
        };
        // Go through the locations one by one
        for (var _a = 0, locationsToLook_1 = locationsToLook; _a < locationsToLook_1.length; _a++) {
            var secretLocation = locationsToLook_1[_a];
            var state_1 = _loop_1(secretLocation);
            if (state_1 === "break")
                break;
        }
    }
    return secretLocations;
}
function resolveFQSN(currentUserSlug, fqsn, platformSecretStore, orgScopeSlug) {
    return __awaiter(this, void 0, void 0, function () {
        var assistantSlug, blockSlug, locationsToLook, _i, locationsToLook_2, secretLocation, secret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    assistantSlug = fqsn.packageSlugs[0];
                    blockSlug = fqsn.packageSlugs[1];
                    locationsToLook = getLocationsToLook(assistantSlug, blockSlug, currentUserSlug, fqsn.secretName, orgScopeSlug);
                    _i = 0, locationsToLook_2 = locationsToLook;
                    _a.label = 1;
                case 1:
                    if (!(_i < locationsToLook_2.length)) return [3 /*break*/, 4];
                    secretLocation = locationsToLook_2[_i];
                    return [4 /*yield*/, platformSecretStore.getSecretFromSecretLocation(secretLocation)];
                case 2:
                    secret = _a.sent();
                    if (secret) {
                        if (secretLocation.secretType === SecretResult_js_1.SecretType.User) {
                            // Only user secret values get sent back to client
                            return [2 /*return*/, {
                                    found: true,
                                    fqsn: fqsn,
                                    secretLocation: secretLocation,
                                    value: secret,
                                }];
                        }
                        else if (secretLocation.secretType !== SecretResult_js_1.SecretType.NotFound) {
                            return [2 /*return*/, {
                                    found: true,
                                    fqsn: fqsn,
                                    secretLocation: secretLocation,
                                }];
                        }
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, {
                        found: false,
                        secretLocation: {
                            secretName: fqsn.secretName,
                            secretType: SecretResult_js_1.SecretType.NotFound,
                        },
                        fqsn: fqsn,
                    }];
            }
        });
    });
}
