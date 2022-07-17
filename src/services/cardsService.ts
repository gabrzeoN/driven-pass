import * as cardsRepository from "../repositories/cardsRepository.js";
import * as cryptationUtil from "../utils/cryptationUtil.js";
import { Credential, Annotation, Card, Wifi } from "@prisma/client";

async function cardMustExist(id: number) {
    const card = await cardsRepository.getById(id);
    if(!card){
        throw {type: "notFound", message: "Card not found!"};
    }
    return card;
}

function userMustOwnRegister(data: Credential | Annotation | Card | Wifi, userId: number) {
    if(data.userId !== userId){
        throw {type: "forbidden", message: "This register doesn't belongs to you!"};
    }
    return;
}

async function titleMustNotBeInUse(title: string, userId: number) {
    const card = await cardsRepository.getByTitleAndUserId(title, userId);
    if(card){
        throw {type: "conflict", message: "You already have a card with this title!"};
    }
}

export async function createCard(newCard: cardsRepository.DbInsertionData) {
    await titleMustNotBeInUse(newCard.title, newCard.userId)
    const encryptedCardPassword = cryptationUtil.softEncrypt(newCard.password);
    const encryptedCardCVV = cryptationUtil.softEncrypt(newCard.securityCode);
    await cardsRepository.insert({
        ...newCard,
        password: encryptedCardPassword,
        securityCode: encryptedCardCVV
    });
    return;
}

// export async function getAllWifis(userId: number) {
//     const wifis = await cardsRepository.getByUserId(userId);
//     const wifisWithDecryptedPassword = cryptationUtil.softDecryptAllPasswords(wifis);
//     return wifisWithDecryptedPassword;
// }

export async function getCard(id: number, userId: number) {
    const card = await cardMustExist(id);
    userMustOwnRegister(card, userId);
    const cardDecrypted = cryptationUtil.softDecryptAllCards([card]);
    return cardDecrypted;
}

// export async function deleteWifi(id: number, userId: number) {
//     const wifi = await wifiMustExist(id);
//     userMustOwnRegister(wifi, userId);
//     await cardsRepository.deleteById(wifi.id);
//     return;
// }