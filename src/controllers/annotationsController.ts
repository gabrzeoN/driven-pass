import { Request, Response } from "express";
import * as annotationsService from "../services/annotationsService.js";
import * as annotationsRepository from "./../repositories/annotationsRepository.js";

export async function createAnnotation(req: Request, res: Response) {
    const { title, note } : annotationsRepository.InputData = req.body;
    const { userId } : { userId: number } = res.locals.userId;
    await annotationsService.createAnnotation({ title, note, userId });
    return res.sendStatus(201);
}

export async function getAllAnnotations(req: Request, res: Response) {
    const { userId } : { userId: number } = res.locals.userId;
    const annotations = await annotationsService.getAllAnnotations(userId);
    return res.status(200).send(annotations);
}

export async function getAnnotation(req: Request, res: Response) {
    const  annotationId: number = parseInt(req.params.annotationId);
    const { userId } : { userId: number } = res.locals.userId;
    if(!annotationId){
        throw {type: "badRequest", message: "Annotation ID must be a number!"}; 
    }
    const annotation = await annotationsService.getAnnotation(annotationId, userId);
    return res.status(200).send(annotation);
}

export async function deleteAnnotation(req: Request, res: Response) {
    const  annotationId: number = parseInt(req.params.annotationId);
    const { userId } : { userId: number } = res.locals.userId;
    if(!annotationId){
        throw {type: "badRequest", message: "Annotation ID must be a number!"}; 
    }
    await annotationsService.deleteAnnotation(annotationId, userId);
    return res.sendStatus(202);
}