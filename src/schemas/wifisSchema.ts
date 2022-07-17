import joi from "joi";
import { InputData } from "../repositories/wifisRepository.js";

export const createSchema = joi.object<InputData>({
    title: joi.string().trim().required(),
    network: joi.string().trim().required(),
    password: joi.string().trim().required()
});