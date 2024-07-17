import Joi from "joi";

export const COURSE_CREATE_SCHEMA = Joi.object({
 
    name: Joi.string().required(),  
    description: Joi.string().min(1).max(1000).required(),  
    duration: Joi.number().integer().min(1).required(),
})