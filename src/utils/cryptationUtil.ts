import Cryptr from "cryptr";
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