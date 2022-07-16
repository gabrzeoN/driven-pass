import * as credentialsRepository from "../repositories/credentialsRepository.js";
import * as cryptationUtil from "../utils/cryptationUtil.js";

async function titleMustNotBeInUse(title: string, userId: number) {
    const credential = await credentialsRepository.getByTitleAndUserId(title, userId);
    if(credential){
        throw {type: "conflict", message: "You already have a credential with this title!"};
    }
}

export async function createCredential(newCredential: credentialsRepository.DbInsertionData) {
    await titleMustNotBeInUse(newCredential.title, newCredential.userId);
    const encryptedPassword = cryptationUtil.softEncrypt(newCredential.password);
    await credentialsRepository.insert({...newCredential, password: encryptedPassword});
    return;
}

export async function getAllUserCredentials(userId: number) {
    const credentials = await credentialsRepository.getByUserId(userId);
    const credentialsWithDecryptedPassword = cryptationUtil.softDecryptAllPasswords(credentials);
    return credentialsWithDecryptedPassword;
}