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

const apiResponse=(res,response_data)=>{

  const {status,data,message,error,code,...rest} = response_data;

  let http_code = 200;
  if(status == true){
    response = {status,data,message,...rest};
    http_code  = code ? code :200;
    
  }else{
   response = {status,error};
   http_code  = code ? code :400;

  }

  res.status(http_code).json(response);
}

const rootPath=  getPath();

module.exports ={generateRand,getPath,apiResponse,rootPath}