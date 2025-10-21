"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Azure = void 0;
exports.Azure = {
    id: "azure",
    displayName: "Azure",
    extraParameters: [],
    models: [
        {
            model: "gpt-4o",
            displayName: "GPT-4o",
            contextLength: 128000,
            recommendedFor: ["chat"],
        },
        {
            model: "gpt-4o-mini",
            displayName: "GPT-4o Mini",
            contextLength: 128000,
            recommendedFor: ["chat"],
        },
    ],
};
