import Querry from "../models/queries";
import { QuerryBody } from "../models/queries";

export const addQuerry = async (body: QuerryBody) => {
    const query = await Querry.create(body);
    return query;
}

export const readQuerries = async () => {
    const querries = await Querry.find()
    return querries;
}

export const removeQuerry = async (id: string) => {
    const querry = await Querry.findByIdAndDelete(id);
}