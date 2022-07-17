import { Request, Response } from "express";
import * as wifisService from "../services/wifisService.js";
import * as wifisRepository from "./../repositories/wifisRepository.js";

export async function createWifi(req: Request, res: Response) {
    const { title, network, password } : wifisRepository.InputData = req.body;
    const { userId } : { userId: number } = res.locals.userId;
    await wifisService.createWifi({ title, network, password, userId });
    return res.sendStatus(201);
}

export async function getAllWifis(req: Request, res: Response) {
    const { userId } : { userId: number } = res.locals.userId;
    const wifis = await wifisService.getAllWifis(userId);
    return res.status(200).send(wifis);
}

export async function getWifi(req: Request, res: Response) {
    const  wifiId: number = parseInt(req.params.wifiId);
    const { userId } : { userId: number } = res.locals.userId;
    if(!wifiId){
        throw {type: "badRequest", message: "Wifi ID must be a number!"}; 
    }
    const wifi = await wifisService.getWifi(wifiId, userId);
    return res.status(200).send(wifi);
}

export async function deleteWifi(req: Request, res: Response) {
    const  wifiId: number = parseInt(req.params.wifiId);
    const { userId } : { userId: number } = res.locals.userId;
    if(!wifiId){
        throw {type: "badRequest", message: "Wifi ID must be a number!"}; 
    }
    await wifisService.deleteWifi(wifiId, userId);
    return res.sendStatus(202);
}