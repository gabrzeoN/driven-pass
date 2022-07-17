import { Request, Response } from "express";
import * as cardsService from "../services/cardsService.js";
import * as cardsRepository from "./../repositories/cardsRepository.js";

export async function createCard(req: Request, res: Response) {
    const { userId } : { userId: number } = res.locals.userId;
    const {
        title,
        cardholderName,
        expirationDate,
        isVirtual,
        number,
        password,
        securityCode,
        type
    } : cardsRepository.InputData = req.body;
    await cardsService.createCard({ 
        title,
        cardholderName,
        expirationDate,
        isVirtual,
        number,
        password,
        securityCode,
        type,
        userId });
    return res.sendStatus(201);
}

// export async function getAllCards(req: Request, res: Response) {
//     const { userId } : { userId: number } = res.locals.userId;
//     const wifis = await cardsService.getAllWifis(userId);
//     return res.status(200).send(wifis);
// }

// export async function getCard(req: Request, res: Response) {
//     const  wifiId: number = parseInt(req.params.wifiId);
//     const { userId } : { userId: number } = res.locals.userId;
//     if(!wifiId){
//         throw {type: "badRequest", message: "Wifi ID must be a number!"}; 
//     }
//     const wifi = await cardsService.getWifi(wifiId, userId);
//     return res.status(200).send(wifi);
// }

// export async function deleteCard(req: Request, res: Response) {
//     const  wifiId: number = parseInt(req.params.wifiId);
//     const { userId } : { userId: number } = res.locals.userId;
//     if(!wifiId){
//         throw {type: "badRequest", message: "Wifi ID must be a number!"}; 
//     }
//     await cardsService.deleteWifi(wifiId, userId);
//     return res.sendStatus(202);
// }