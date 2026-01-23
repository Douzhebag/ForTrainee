"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRout_1 = __importDefault(require("./handlers/userRout"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', userRout_1.default);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
