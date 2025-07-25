import { networkInterfaces } from 'os';

import * as fs from 'fs';
export async function getLocalExternalIP(): Promise<string> {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  throw new Error('Unable to find local external IP address');
}

export async function getDirectories(srcPath: string): Promise<string[]> {
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

export async function getFiles(srcPath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        return reject(err);
      }
      const filesList = files
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name); // 只返回文件名
      resolve(filesList);
    });
  });
}
