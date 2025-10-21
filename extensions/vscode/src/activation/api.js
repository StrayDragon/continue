"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VsCodeContinueApi = void 0;
var VsCodeContinueApi = /** @class */ (function () {
    function VsCodeContinueApi(vscodeExtension) {
        this.vscodeExtension = vscodeExtension;
    }
    VsCodeContinueApi.prototype.registerCustomContextProvider = function (contextProvider) {
        this.vscodeExtension.registerCustomContextProvider(contextProvider);
    };
    return VsCodeContinueApi;
}());
exports.VsCodeContinueApi = VsCodeContinueApi;
