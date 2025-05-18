const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const createToken=async(payload)=>{
  let token=jwt.sign(payload, process?.env?.JWT_SECRET, { expiresIn: '24h' });
  return token;

}

export const verifyToken=async(token)=>{
    const decoded =jwt.verify(token, process?.env?.JWT_SECRET);
    console.log("decoded",decoded);
    return decoded;

}


  