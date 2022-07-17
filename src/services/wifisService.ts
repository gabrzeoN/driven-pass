import * as wifisRepository from "../repositories/wifisRepository.js";
import * as cryptationUtil from "../utils/cryptationUtil.js";
import { Credential, Annotation, Card, Wifi } from "@prisma/client";

async function wifiMustExist(id: number) {
    const wifi = await wifisRepository.getById(id);
    if(!wifi){
        throw {type: "notFound", message: "Wifi not found!"};
    }
    return wifi;
}

function userMustOwnRegister(data: Credential | Annotation | Card | Wifi, userId: number) {
    if(data.userId !== userId){
        throw {type: "forbidden", message: "This register doesn't belongs to you!"};
    }
    return;
}

export async function createWifi(newWifi: wifisRepository.DbInsertionData) {
    const encryptedWifiPassword = cryptationUtil.softEncrypt(newWifi.password);
    await wifisRepository.insert({...newWifi, password: encryptedWifiPassword});
    return;
}

// export async function getAllAnnotations(userId: number) {
//     const annotations = await wifisRepository.getByUserId(userId);
//     const annotationsWithDecryptedNote = cryptationUtil.softDecryptAllNotes(annotations);
//     return annotationsWithDecryptedNote;
// }

export async function getWifi(id: number, userId: number) {
    const wifi = await wifiMustExist(id);
    userMustOwnRegister(wifi, userId);
    const wifiWithDecryptedNote = cryptationUtil.softDecryptAllPasswords([wifi]);
    return wifiWithDecryptedNote;
}

// export async function deleteAnnotation(id: number, userId: number) {
//     const annotation = await annotationMustExist(id);
//     userMustOwnRegister(annotation, userId);
//     await wifisRepository.deleteById(annotation.id);
//     return;
// }