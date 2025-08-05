"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalExternalIP = getLocalExternalIP;
exports.getDirectories = getDirectories;
exports.getFiles = getFiles;
const os_1 = require("os");
const fs = __importStar(require("fs"));
async function getLocalExternalIP() {
    const nets = (0, os_1.networkInterfaces)();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    throw new Error('Unable to find local external IP address');
}
async function getDirectories(srcPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
            if (err) {
                return reject(err);
            }
            const directories = files
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name);
            resolve(directories);
        });
    });
}
async function getFiles(srcPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
            if (err) {
                return reject(err);
            }
            const filesList = files
                .filter((dirent) => dirent.isFile())
                .map((dirent) => dirent.name);
            resolve(filesList);
        });
    });
}
//# sourceMappingURL=index.js.map