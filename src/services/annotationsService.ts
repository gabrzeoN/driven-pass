import * as annotationsRepository from "../repositories/annotationsRepository.js";
import * as cryptationUtil from "../utils/cryptationUtil.js";
import { Credential, Annotation, Card, Wifi } from "@prisma/client";

async function titleMustNotBeInUse(title: string, userId: number) {
    const annotation = await annotationsRepository.getByTitleAndUserId(title, userId);
    if(annotation){
        throw {type: "conflict", message: "You already have an annotation with this title!"};
    }
}

async function annotationMustExist(id: number) {
    const annotation = await annotationsRepository.getById(id);
    if(!annotation){
        throw {type: "notFound", message: "Annotation not found!"};
    }
    return annotation;
}

function userMustOwnRegister(data: Credential | Annotation | Card | Wifi, userId: number) {
    if(data.userId !== userId){
        throw {type: "forbidden", message: "This register doesn't belongs to you!"};
    }
    return;
}

export async function createAnnotation(newAnnotation: annotationsRepository.DbInsertionData) {
    await titleMustNotBeInUse(newAnnotation.title, newAnnotation.userId);
    const encryptedAnnotation = cryptationUtil.softEncrypt(newAnnotation.note);
    await annotationsRepository.insert({...newAnnotation, note: encryptedAnnotation});
    return;
}

export async function getAllAnnotations(userId: number) {
    const annotations = await annotationsRepository.getByUserId(userId);
    const annotationsWithDecryptedNote = cryptationUtil.softDecryptAllNotes(annotations);
    return annotationsWithDecryptedNote;
}

export async function getAnnotation(id: number, userId: number) {
    const annotation = await annotationMustExist(id);
    userMustOwnRegister(annotation, userId);
    const annotationWithDecryptedNote = cryptationUtil.softDecryptAllNotes([annotation]);
    return annotationWithDecryptedNote;
}

export async function deleteAnnotation(id: number, userId: number) {
    const annotation = await annotationMustExist(id);
    userMustOwnRegister(annotation, userId);
    await annotationsRepository.deleteById(annotation.id);
    return;
}