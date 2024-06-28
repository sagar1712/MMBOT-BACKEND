const httpStatus = require('http-status');
const db = require('../models');
const Bot = db.bot;
const ApiError = require('../utils/ApiError');
const moment = require('moment');

//TODO- change address to user id
const createBot = async ({ token, botType, thresholdPrice, userId }) => {
	const user = await User.findOne({
		where: { id: userId },
	});
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Can not find user');
	}
	const bot = await Bot.create({
		token,
		userId: userId,
		isDeleted: false,
		isActive: true,
		botType,
		thresholdPrice,
		createdAt: moment().unix(),
	});
	return bot;
};

const getAllBots = async (filter, options) => {
	const bots = await Bot.findAll();
	return bots;
};

const getBotById = async (id) => {
	return Bot.findOne({ where: { id } });
};

const updateBot = async (id, updateBody) => {
	const bot = await Bot.findOne({ where: { id } });
	if (!bot) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Not Found Bot');
	}
	const {
		isDeleted = bot.isDeleted,
		isActive = bot.isActive,
		botType = bot.botType,
		thresholdPrice = bot.thresholdPrice,
		createdAt = bot.createdAt,
	} = updateBody;
	const updateData = {
		isDeleted,
		isActive,
		botType,
		thresholdPrice,
		createdAt,
	};
	const row = await Bot.update(updateData, {
		where: { id },
	});
	return row;
};

const deleteBotById = async (botId) => {
	const bot = await getBotById(botId);
	if (!bot) return null;
	await bot.destroy();
	return bot;
};

module.exports = {
	createBot,
	getAllBots,
	getBotById,
	deleteBotById,
	updateBot,
};
