import * as authRepository from "../repositories/authRepository.js";
import * as saltUtil from "../utils/saltUtil.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function emailMustNotBeRegister(email:string) {
    const user = await authRepository.getByEmail(email);
    if(user){
        throw {type: "conflict", message: "This email is already in use!"};
    }
    return;
}

function encryptPassword(password:string) {
    const encryptedPassword = bcrypt.hashSync(password, saltUtil.bcrypt);
    return encryptedPassword;
}

async function saveSignUp(user: authRepository.UserSignUpData) {
    await authRepository.insertSignUp(user);
    return;
}

export async function signUp(user: authRepository.UserSignUpData) {
    await emailMustNotBeRegister(user.email);
    const encryptedPassword = encryptPassword(user.password);
    await saveSignUp({email: user.email, password: encryptedPassword});
    return;
}

async function emailMustBeRegister(email:string) {
    const user = await authRepository.getByEmail(email);
    if(!user){
        throw {type: "unauthorized", message: "Incorrect email or password!"};
    }
    return user;
}

function passwordMustMatch(inputPassword: string, userPassword:string) {
    const correctPassword = bcrypt.compareSync(inputPassword, userPassword);
    if(!correctPassword){
        throw {type: "unauthorized", message: "Incorrect email or password!"};
    } 
    return;
}

async function generateJwtToken(userId:number) {
    const data = { userId }
    const expiresIn = process.env.JWT_EXPIRES_IN ?? '1d';
    const config = { expiresIn, subject: userId.toString() };
    const token = jwt.sign(data, saltUtil.jwt, config);
    return token;
}

async function saveSignIn(user: authRepository.UserSignInData) {
    await authRepository.insertSignUp(user);
    return;
}


export async function signIn(loginInput: authRepository.UserSignInData) {
    const user = await emailMustBeRegister(loginInput.email);
    passwordMustMatch(loginInput.password, user.password);
    const token = generateJwtToken(user.id);
    // await saveSignIn({email: user.email, password: encryptedPassword});
    return token;
}