import Cryptr from "cryptr";
import { Credential, Annotation, Card, Wifi } from "@prisma/client";
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

export function softDecryptAllPasswords(data: Credential[] | Wifi[]) {
    data.map(data => {
        data.password = softDecrypt(data.password);
    })
    return data;
}

export function softDecryptAllNotes(data: Annotation[]) {
    data.map(data => {
        data.note = softDecrypt(data.note);
    })
    return data;
}

export function softDecryptAllCards(data: Card[]) {
    data.map(data => {
        data.securityCode = softDecrypt(data.securityCode);
        data.password = softDecrypt(data.password);
    })
    return data;
}