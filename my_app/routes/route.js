import express from 'express';
import * as controller from './controller.js';

const router = express.Router();

router.get("/", controller.main);

router.get("/write", controller.writeForm);

router.post("/write", controller.write);

router.get("/detail/:id", controller.detail);

router.get("/edit/:id", controller.editForm);

router.post("/edit/:id", controller.edit);``

router.post("/delete/:id", controller.deleteContent);

export { router as routes };