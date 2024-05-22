import Joi from "joi";

const signUp = Joi.object({
          name: Joi.string().min(3).max(10).required(),
          password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
          rePassword: Joi.ref('password'),
          phone: Joi.string().pattern(new RegExp(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/))
}).required();


const login = Joi.object({
          phone: Joi.string().pattern(new RegExp(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)).required(),
          password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
}).required();

export {
          signUp,
          login
}