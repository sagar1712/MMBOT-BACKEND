const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBot = {
	body: Joi.object().keys({
		token: Joi.string().required(),
		botType: Joi.string().required(),
		thresholdPrice: Joi.string().required(),
		userId: Joi.number().required(),
	}),
};

const updateBot = {
	params: Joi.object().keys({
		id: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			token: Joi.string(),
			botType: Joi.string(),
			thresholdPrice: Joi.string(),
			isDeleted: Joi.boolean(),
			isActive: Joi.boolean(),
		})
		.min(1),
};

module.exports = {
	createBot,
	updateBot,
};
