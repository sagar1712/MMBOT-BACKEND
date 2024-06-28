const express = require('express');
const router = express.Router();

const helloController = require('../../controller/hello.controller.js');

router.get('/', helloController.hello);

module.exports = router;

/**
 * @swagger
 * /v1:
 *  get:
 *     tags:
 *     - hello
 *     description: API is running
 *     responses:
 *       200:
 *         description: API is running
 */
