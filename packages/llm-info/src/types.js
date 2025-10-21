"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMediaTypes = exports.MediaType = exports.ChatTemplate = void 0;
var ChatTemplate;
(function (ChatTemplate) {
    ChatTemplate["None"] = "none";
    // TODO
})(ChatTemplate || (exports.ChatTemplate = ChatTemplate = {}));
var MediaType;
(function (MediaType) {
    MediaType["Text"] = "text";
    MediaType["Image"] = "image";
    MediaType["Audio"] = "audio";
    MediaType["Video"] = "video";
})(MediaType || (exports.MediaType = MediaType = {}));
exports.AllMediaTypes = [
    MediaType.Text,
    MediaType.Image,
    MediaType.Audio,
    MediaType.Video,
];
