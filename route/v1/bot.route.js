const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');

const botController = require('../../controller/bot.controller.js');
const botValidation = require('../../validations/bot.validation');

/**
 * @openapi
 * /:
 *  get:
 *     tags:
 *     - hello
 *     description: API is running
 *     responses:
 *       200:
 *         description: API is running
 */
router.get('/all', botController.getAllBots);
router.get('/:id', botController.getBotById);
router.post('/', validate(botValidation.createBot), botController.createBot);
router.put(
	'/:id',
	validate(botValidation.updateBot),
	botController.updateBotById
);
router.delete('/:id', botController.deleteBotById);

module.exports = router;
