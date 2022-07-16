import Cryptr from "cryptr";
import { Credential } from "@prisma/client";
import * as saltUtil from "../utils/saltUtil.js";

export function softEncrypt(data: string) {
    const cryptr = new Cryptr(saltUtil.cryptr);
    const encryptedData = cryptr.encrypt(data);
    return encryptedData;
}

export function softDecrypt(data: string) {
    const cryptr = new Cryptr(saltUtil.cryptr);
    const decryptedData = cryptr.decrypt(data);
    return decryptedData;
}

export function softDecryptAllPasswords(data: Credential[]) {
    data.map(data => {
        data.password = softDecrypt(data.password);
    })
    return data;
}