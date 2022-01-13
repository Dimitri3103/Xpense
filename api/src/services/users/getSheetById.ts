import Sheet from "../../models/sheet";
import sheetRepository from '../../repositories/sheetRepository'

export default async (userId: string) : Promise<Sheet[]>=> {
    // call get sheet by user id from sheet repository
    return await sheetRepository.getSheetByUserId(userId);

}
