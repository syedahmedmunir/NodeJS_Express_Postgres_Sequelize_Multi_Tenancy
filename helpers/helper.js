const fs        = require('fs');
const path      = require('path');

const  generateRand =(length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


const getPath =(customPath="") =>{
  let currentDir = __dirname;

  while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    const parentDir = path.resolve(currentDir, '..');
    if (parentDir === currentDir) {
      throw new Error('Root path not found');
    }
    currentDir = parentDir;
  }

  if (customPath) {
    currentDir = path.join(currentDir, customPath);
  }

  return currentDir;
}

const rootPath=  getPath();

module.exports ={generateRand,getPath,rootPath}