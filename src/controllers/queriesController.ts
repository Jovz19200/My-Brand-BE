import { Request, Response } from "express"
import { addQuerry, readQuerries, removeQuerry } from "../services/querriesServices"
import { querySchema } from "../joi/validations";

export const createQuery = async (req: Request, res: Response) => {
    try {
        const { error, value } = await querySchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message,
            });
        }
        
        const query = await addQuerry({
            name: value.name,
            email: value.email,
            message: value.message
        });
        res.status(201).json({
            status: "success",
            message: "your message was sent!",
            data: query
        });
    } catch (err: any) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message
        });
    }
}

export const getQuerries = async (req: Request, res: Response) => {
    try{
        const querries = await readQuerries();
        res.status(200).json({
            status: "success",
            data: querries
        })
    } catch(err: any){
        res.status(500).json({
            status: "Error",
            error: err.message
        })
    }
}

export const deleteQuerry = async (req: Request, res: Response) => {
    try{
        const querry = await removeQuerry(req.params.id);
        res.status(204).json({
            status: "success",
            message: "querry deleted successfully!"
        })
    } catch(err: any){
        res.status(500).json({
            status: "Error",
            error: err.message
        })
    }
}