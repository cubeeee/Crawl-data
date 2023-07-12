import { Request, Response } from "express"
import System from "../model/System";
import { covertSlug } from "../utils/index";
import { ISystem } from "../typing/typing";
import { generateMongoQuery } from "../utils/datatable";
import Product from "../model/Product";


const systemController = {
    add: async(req: Request, res: Response) => {
        const title = req.body.title;
        const active = req.body.active;
        await new System({
            title,
            slug: covertSlug(title),
            active
        }).save()
        .then((system) => {
            res.json({
                status: 1,
                message: "Add new system successfully",
                data: system,
            })
        })
        .catch((err) => {
            res.json({
                status: 0,
                message: err.message.toString(),
            });
        })
    },

    edit: async(req: Request, res: Response) => {
        try {
            const title = req.body.title;
            const active = req.body.active;
            const system = await System.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        title,
                        slug: covertSlug(title),
                        active
                    }
                }
            );
            if (system) {
                await system.save();
                res.json({
                status: 1,
                message: "Edit system successfully",
                });
            }
        } catch (error) {
            res.json({
            status: 0,
            message: error,
            });
        }
    },

    delete: async(req : Request, res: Response) => {
        try {
          const id  = req.params.id;
        const removeSystem = await System.findByIdAndDelete(id);
        const updateProduct = await Product.updateMany(
            { system: id },
            { $pull: { system: id } }
            
        )
        if (removeSystem) {
            res.json({
                status: 1,
                message: "Delete system successfully",
            });
        }
        } catch (error) {
            res.json({
                status: 0,
                message: error,
            });
        }

    },

    getAll: async (req: Request, res: Response) => {
        const { find, limit, skip, sort } = generateMongoQuery(req.body);
        const count = await System.countDocuments(find);
        const systems = await System.find(find).sort(sort).limit(limit).skip(skip);
        res.json({
          success: true,
          data: systems,
          recordsFiltered: count,
        });
    },
}

export default systemController;