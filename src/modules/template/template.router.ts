import express, { Router } from "express";
import { isAdminAuthenticated } from "../../middlewares/index";
import validator from "../../middlewares/validator";
import { addTemplateValidationSchema } from "./template.validators";
import {
  createATemplate,
  deleteTemplate,
  getAllTemplates,
  updateTemplate,
} from "./template.controller";

const templateRouter = Router();

// get all templates
templateRouter.get("/templates", isAdminAuthenticated, getAllTemplates);

// create a template
templateRouter.post(
  "/templates",
  isAdminAuthenticated,
  validator(addTemplateValidationSchema),
  createATemplate
);

// update template
templateRouter.put(
  "/templates/:id",
  isAdminAuthenticated,
  validator(addTemplateValidationSchema),
  updateTemplate
);

// delete a template
templateRouter.delete("/templates/:id", isAdminAuthenticated, deleteTemplate);

export default templateRouter;
