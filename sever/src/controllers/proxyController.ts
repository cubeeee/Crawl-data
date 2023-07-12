import { Request, Response } from "express";
import logger from "../helpers/logger";
import { IProxy } from "../typing/typing";
import Proxy from "../models/Proxy";
import { generateMongoQuery } from "../utils/database";

const proxyController = {
  add: async (req: Request, res: Response) => {
    try {
      const { ip, port, password, username }:IProxy = req.body;
      const proxy =  await Proxy.findOne({ host: `${ip}:${port}` });
      if (proxy) {
        return res.json({
          status: 'error',
          message: 'Proxy already exists'
        })
      }
      const newProxy = await Proxy.create({
        ip,
        port,
        password,
        username,
        host: `${ip}:${port}`
      });
      await newProxy.save();
      return res.json({
        status: 'success',
        message: 'Add proxy success'
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
      const { ip, port, password, username, status , host }:IProxy = req.body;
      const proxy =  await Proxy.findByIdAndUpdate({ _id: id }, {
        ip,
        port,
        password,
        username,
        status,
        host: `${ip}:${port}`
      }, { new: true });
      await proxy?.save();
      res.json({
        status: 'success',
        message: 'Edit proxy success'
      });
      if (!proxy) {
        res.json({
          status: 'error',
          message: 'Proxy not found'
        });     
      }   
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
      await Proxy.findByIdAndDelete({ _id: id });
      res.json({
        status: 'success',
        message: 'Delete proxy success'
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
    const count = await Proxy.countDocuments(find);
    const proxies = await Proxy.find(find).sort(sort).limit(limit).skip(skip);
    res.json({
      success: true,
      data: proxies,
      recordsFiltered: count,
    });
  },
};

export default proxyController;