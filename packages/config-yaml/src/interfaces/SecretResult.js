"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretType = void 0;
exports.encodeSecretLocation = encodeSecretLocation;
exports.decodeSecretLocation = decodeSecretLocation;
var slugs_js_1 = require("./slugs.js");
var SecretType;
(function (SecretType) {
    SecretType["User"] = "user";
    SecretType["Package"] = "package";
    SecretType["Organization"] = "organization";
    SecretType["NotFound"] = "not_found";
    SecretType["ModelsAddOn"] = "models_add_on";
    SecretType["FreeTrial"] = "free_trial";
    SecretType["LocalEnv"] = "local_env";
    SecretType["ProcessEnv"] = "process_env";
})(SecretType || (exports.SecretType = SecretType = {}));
function encodeSecretLocation(secretLocation) {
    if (secretLocation.secretType === SecretType.Organization) {
        return "".concat(SecretType.Organization, ":").concat(secretLocation.orgSlug, "/").concat(secretLocation.secretName);
    }
    else if (secretLocation.secretType === SecretType.User) {
        return "".concat(SecretType.User, ":").concat(secretLocation.userSlug, "/").concat(secretLocation.secretName);
    }
    else if (secretLocation.secretType === SecretType.Package) {
        return "".concat(SecretType.Package, ":").concat((0, slugs_js_1.encodePackageSlug)(secretLocation.packageSlug), "/").concat(secretLocation.secretName);
    }
    else if (secretLocation.secretType === SecretType.NotFound) {
        return "".concat(SecretType.NotFound, ":").concat(secretLocation.secretName);
    }
    else if (secretLocation.secretType === SecretType.ModelsAddOn) {
        return "".concat(SecretType.ModelsAddOn, ":").concat((0, slugs_js_1.encodePackageSlug)(secretLocation.blockSlug), "/").concat(secretLocation.secretName);
    }
    else if (secretLocation.secretType === SecretType.FreeTrial) {
        return "".concat(SecretType.FreeTrial, ":").concat((0, slugs_js_1.encodePackageSlug)(secretLocation.blockSlug), "/").concat(secretLocation.secretName);
    }
    else if (secretLocation.secretType === SecretType.LocalEnv) {
        return "".concat(SecretType.LocalEnv, ":").concat(secretLocation.secretName);
    }
    else if (secretLocation.secretType === SecretType.ProcessEnv) {
        return "".concat(SecretType.ProcessEnv, ":").concat(secretLocation.secretName);
    }
    else {
        throw new Error("Invalid secret type: ".concat(secretLocation));
    }
}
function decodeSecretLocation(secretLocation) {
    var _a = secretLocation.split(":"), secretType = _a[0], rest = _a[1];
    var parts = rest.split("/");
    var secretName = parts[parts.length - 1];
    switch (secretType) {
        case SecretType.Organization:
            return {
                secretType: SecretType.Organization,
                orgSlug: parts[0],
                secretName: secretName,
            };
        case SecretType.User:
            return {
                secretType: SecretType.User,
                userSlug: parts[0],
                secretName: secretName,
            };
        case SecretType.Package:
            return {
                secretType: SecretType.Package,
                packageSlug: { ownerSlug: parts[0], packageSlug: parts[1] },
                secretName: secretName,
            };
        case SecretType.NotFound:
            return {
                secretType: SecretType.NotFound,
                secretName: secretName,
            };
        case SecretType.ModelsAddOn:
            return {
                secretType: SecretType.ModelsAddOn,
                secretName: secretName,
                blockSlug: {
                    ownerSlug: parts[0],
                    packageSlug: parts[1],
                },
            };
        case SecretType.FreeTrial:
            return {
                secretType: SecretType.FreeTrial,
                secretName: secretName,
                blockSlug: {
                    ownerSlug: parts[0],
                    packageSlug: parts[1],
                },
            };
        case SecretType.LocalEnv:
            return {
                secretType: SecretType.LocalEnv,
                secretName: secretName,
            };
        case SecretType.ProcessEnv:
            return {
                secretType: SecretType.ProcessEnv,
                secretName: secretName,
            };
        default:
            throw new Error("Invalid secret type: ".concat(secretType));
    }
}
