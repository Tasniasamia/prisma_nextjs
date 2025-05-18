const bcrypt = require('bcrypt');

export const createToken=({email,name})=>{


}

export const getToken=()=>{

}

export const createhasPassword = async (password) => {
    console.log("password",data?.password);
    if (!password || typeof password !== "string" || password.trim() === "") {
      throw new Error("data?.password is missing or invalid");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashing successful:", hashPassword);
    return hashPassword;
  };
  