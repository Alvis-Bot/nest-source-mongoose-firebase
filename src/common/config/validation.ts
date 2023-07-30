import * as Joi from "joi";

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid("dev", "prod", "test").required(),
  PORT: Joi.number().default(3000).required(),
  DATABASE_URI: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  FOLDER_UPLOAD: Joi.string().required(),
});
