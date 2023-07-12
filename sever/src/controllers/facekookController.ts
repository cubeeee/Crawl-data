import { Request, Response } from "express";
import { scanAll, scanUid } from "../utils";
import { IFacebook } from "../typing/typing";
import Facebook from "../models/Facebook";
import { generateMongoQuery } from "../utils/database";
import Excel from "exceljs";


const facebookController = {
  add: async (req: Request, res: Response) => {
    try {
      const { name, facebookId, birth, status }:IFacebook = req.body;
      const facebook =  await Facebook.findOne({ facebookId });
      if (facebook) {
        return res.json({
          status: 'error',
          message: 'Facebook already exists'
        });
      }
      const newFacebook = await Facebook.create({
        name,
        facebookId,
        birth,
        status
      });
      await newFacebook.save();
      return res.json({
        status: 'success',
        message: 'Add facebook success'
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: error.message
      });
    }
  },

  edit: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, facebookId, birth, status }:IFacebook = req.body;
      const facebook =  await Facebook.findByIdAndUpdate({ _id: id }, {
        name,
        facebookId,
        birth,
        status
      }, { new: true });
      await facebook?.save();
      res.json({
        status: 'success',
        message: 'Edit facebook success'
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: error.message
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const facebook =  await Facebook.findByIdAndDelete({ _id: id });
      res.json({
        status: 'success',
        message: 'Delete facebook success'
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: error.message
      });
    }
  },

  get: async (req: Request, res: Response) => {
    const { find, limit, skip, sort } = generateMongoQuery(req.body);
    const count = await Facebook.countDocuments(find);
    const facebooks = await Facebook.find(find).sort(sort).limit(limit).skip(skip);
    res.json({
      success: true,
      data: facebooks,
      recordsFiltered: count,
    });
  },

  export: async (req: Request, res: Response) => {
    // exceljs data export to excel file Facebook limit 1000
    const limit = req.body.limit || 100;
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Facebook');
    worksheet.columns = [
      { header: 'Facebook ID', key: 'facebookId', width: 30 },
    ]
    const facebooks = await Facebook.find({ export: false }).limit(limit);
    for(const facebook of facebooks) {
      worksheet.addRow({ facebookId: facebook.facebookId });
      await facebook.save();
    }
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'Facebook.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  },
};

export default facebookController;