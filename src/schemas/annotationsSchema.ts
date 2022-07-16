import joi from "joi";
import { InputData } from "../repositories/annotationsRepository.js";

export const createSchema = joi.object<InputData>({
    title: joi.string().trim().max(50).required(),
    note: joi.string().max(1000).trim().required()
});