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

export async function getAllCards(req: Request, res: Response) {
    const { userId } : { userId: number } = res.locals.userId;
    const cards = await cardsService.getAllCards(userId);
    return res.status(200).send(cards);
}

export async function getCard(req: Request, res: Response) {
    const  cardId: number = parseInt(req.params.cardId);
    const { userId } : { userId: number } = res.locals.userId;
    if(!cardId){
        throw {type: "badRequest", message: "Card ID must be a number!"}; 
    }
    const card = await cardsService.getCard(cardId, userId);
    return res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response) {
    const  cardId: number = parseInt(req.params.cardId);
    const { userId } : { userId: number } = res.locals.userId;
    if(!cardId){
        throw {type: "badRequest", message: "Card ID must be a number!"}; 
    }
    await cardsService.deleteCard(cardId, userId);
    return res.sendStatus(202);
}