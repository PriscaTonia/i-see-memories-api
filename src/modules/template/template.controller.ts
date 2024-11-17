import express, { Request, Response } from "express";
import response from "../../utils/response";
import { IAdmin } from "../admin/admin.types";
import templateService from "./template.service";

// get templates controller
export const getAllTemplates = async (
  req: express.Request,
  res: express.Response
) => {
  const templates = await templateService.getTemplates();

  res.send(response("Templates", templates));
};

// create a template controller
export const createATemplate = async (
  req: Request & { admin: IAdmin },
  res: Response
) => {
  const id = req.admin._id;
  const template = await templateService.createTemplateByAdminId({
    ...req.body,
    userId: id,
  });
  res.send(response("Template created successfully", template));
};

// update a template controller
export const updateTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateBody = req.body;

  const updatedTemplate = await templateService.updateTemplateById(
    id,
    updateBody
  );

  if (!updatedTemplate) {
    return res.status(404).send(response("Template not found", null, false));
  }

  res.send(response("Template updated successfully", updatedTemplate));
};

// delete a template controller
export const deleteTemplate = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  const deletedTemplate = await templateService.deleteTemplateById(id);

  res.send(response("Template deleted successfully", deletedTemplate));
};
