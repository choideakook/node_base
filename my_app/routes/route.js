import express from 'express';
import * as controller from './controller.js';

const router = express.Router();

router.get("/", controller.main);

router.get("/write", controller.writeForm);

router.post("/write", controller.write);

router.get("/detail", controller.detail);

export { router as routes };