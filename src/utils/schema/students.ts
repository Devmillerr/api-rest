import Joi from "joi";  

export const STUDENT_CREATE_SCHEMA = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

export const STUDENTDETAILS_CREATE_SCHEMA = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    age: Joi.number().integer().min(0).required(),
})


export const COURSE_UPDATE_SCHEMA = Joi.object({
  courseId: Joi.string().uuid().required(), 
});
