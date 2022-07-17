import joi from "joi";
import { InputData } from "../repositories/cardsRepository.js";

export const createSchema = joi.object<InputData>({
    title: joi.string().trim().required(),
    cardholderName: joi.string().trim().required(),
    number: joi.string().trim().pattern(new RegExp('^[0-9]{10,20}$')).required(),
    expirationDate: joi.string().pattern(new RegExp('^[0-9]{2}/[0-9]{2}$')).trim().required(),
    password: joi.string().trim().pattern(new RegExp('^[0-9]{4,8}$')).required(),
    securityCode: joi.string().trim().pattern(new RegExp('^[0-9]{3}$')).required(),
    type: joi.string().valid('credit', 'debit', 'both').required(),
    isVirtual: joi.boolean().required()
});