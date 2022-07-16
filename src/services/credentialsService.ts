import * as credentialsRepository from "../repositories/credentialsRepository.js";
import * as cryptationUtil from "../utils/cryptationUtil.js";
import { Credential, Annotation, Card, Wifi } from "@prisma/client";

async function titleMustNotBeInUse(title: string, userId: number) {
    const credential = await credentialsRepository.getByTitleAndUserId(title, userId);
    if(credential){
        throw {type: "conflict", message: "You already have a credential with this title!"};
    }
}

async function credentialMustExist(id: number) {
    const credential = await credentialsRepository.getById(id);
    if(!credential){
        throw {type: "notFound", message: "Credential not found!"};
    }
    return credential;
}

function userMustOwnRegister(data: Credential | Annotation | Card | Wifi, userId: number) {
    if(data.userId !== userId){
        throw {type: "forbidden", message: "This register doesn't belongs to you!"};
    }
    return;
}

export async function createCredential(newCredential: credentialsRepository.DbInsertionData) {
    await titleMustNotBeInUse(newCredential.title, newCredential.userId);
    const encryptedPassword = cryptationUtil.softEncrypt(newCredential.password);
    await credentialsRepository.insert({...newCredential, password: encryptedPassword});
    return;
}

export async function getAllCredentials(userId: number) {
    const credentials = await credentialsRepository.getByUserId(userId);
    const credentialsWithDecryptedPassword = cryptationUtil.softDecryptAllPasswords(credentials);
    return credentialsWithDecryptedPassword;
}

export async function getCredential(id: number, userId: number) {
    const credential = await credentialMustExist(id);
    userMustOwnRegister(credential, userId);
    const credentialWithDecryptedPassword = cryptationUtil.softDecryptAllPasswords([credential]);
    return credentialWithDecryptedPassword;
}

export async function deleteCredential(id: number, userId: number) {
    const credential = await credentialMustExist(id);
    userMustOwnRegister(credential, userId);
    await credentialsRepository.deleteById(credential.id);
    return;
}