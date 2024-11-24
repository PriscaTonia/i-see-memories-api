import { TemplateModel } from "./template.model";
import { ITemplate, ITemplateReq } from "./template.types";

class TemplateService {
  async getTemplates() {
    return await TemplateModel.find({ isDeleted: false });
  }
  async getATemplate(id: string) {
    return await TemplateModel.findById(id);
  }
  async createTemplateByAdminId(createdTemplateDto: ITemplateReq) {
    return await TemplateModel.create(createdTemplateDto);
  }
  async updateTemplateById(id: string, updateQuery: { [key: string]: any }) {
    return TemplateModel.findByIdAndUpdate(id, updateQuery, { new: true });
  }
  async deleteTemplateById(id: string) {
    return await TemplateModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}

export default new TemplateService();
