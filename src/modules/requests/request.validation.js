// Import the Joi validation library
import Joi from "joi";

const createPropertyRequestSchema = Joi.object({
  propertyType: Joi.string().valid('VILLA', 'HOUSE', 'LAND', 'APARTMENT').required().messages({
    'any.required': 'Property type is required',
    'any.only': 'Property type must be one of VILLA, HOUSE, LAND, APARTMENT'
  }),
  area: Joi.number().required().messages({
    'any.required': 'Area is required',
    'number.base': 'Area must be a number'
  }),
  price: Joi.number().required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a number'
  }),
  city: Joi.string().required().messages({
    'any.required': 'City is required',
    'string.base': 'City must be a string'
  }),
  district: Joi.string().required().messages({
    'any.required': 'District is required',
    'string.base': 'District must be a string'
  }),
  description: Joi.string().min(10).required().messages({
    'any.required': 'Description is required',
    'string.base': 'Description must be a string'
  }),
});

const updatePropertyRequestSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  description: Joi.string().min(10).required().messages({
    'any.required': 'Description is required',
    'string.base': 'Description must be a string'
  }),
  area: Joi.number().required().messages({
    'any.required': 'Area is required',
    'number.base': 'Area must be a number'
  }),
  price: Joi.number().required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a number'
  }),
});

const deletePropertyRequestSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'any.required': 'property ID is required',
    'string.base': 'Property ID must be a Valid ID'
  })
});


const getSinglePropertyRequestSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'any.required': 'property ID is required',
    'string.base': 'Property ID must be a Valid ID'
  })
});


export { createPropertyRequestSchema, updatePropertyRequestSchema, deletePropertyRequestSchema, getSinglePropertyRequestSchema }