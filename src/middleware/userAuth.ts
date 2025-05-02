import * as JWT from "jsonwebtoken"
const SECRET_KEY='ba9f61c449273e2e6f86f2362b8bda88a45786b50e7b7cbc8f76d5ced6ddbeb9'

export const userAuth = async ()=>{

}

export const getJWTtoken = async (payload:any)=>{
    const token = JWT.sign({_id:payload._id},SECRET_KEY) 
    return token
}