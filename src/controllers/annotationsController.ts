import { Request, Response } from "express";
import * as annotationsService from "../services/annotationsService.js";
import * as annotationsRepository from "./../repositories/annotationsRepository.js";

export async function createAnnotation(req: Request, res: Response) {
    const { title, note } : annotationsRepository.InputData = req.body;
    const { userId } : { userId: number } = res.locals.userId;
    await annotationsService.createAnnotation({ title, note, userId });
    return res.sendStatus(201);
}

// export async function getAllCredentials(req: Request, res: Response) {
//     const { userId } : { userId: number } = res.locals.userId;
//     const credentials = await credentialsService.getAllCredentials(userId);
//     return res.status(200).send(credentials);
// }

export async function getAnnotation(req: Request, res: Response) {
    const  annotationId: number = parseInt(req.params.annotationId);
    const { userId } : { userId: number } = res.locals.userId;

    if(!annotationId){
        throw {type: "badRequest", message: "Annotation ID must be a number!"}; 
    }

    const annotation = await annotationsService.getAnnotation(annotationId, userId);
    return res.status(200).send(annotation);
}

// export async function deleteCredential(req: Request, res: Response) {
//     const  credentialId: number = parseInt(req.params.credentialId);
//     const { userId } : { userId: number } = res.locals.userId;

//     if(!credentialId){
//         throw {type: "badRequest", message: "Credential ID must be a number!"}; 
//     }

//     await credentialsService.deleteCredential(credentialId, userId);
//     return res.sendStatus(202);
// }