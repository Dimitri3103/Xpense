import { classToPlain } from "class-transformer"
import sheetRepository, { CreateSheetProps } from "../../repositories/sheetRepository"

export default async (id: string, sheet: CreateSheetProps): Promise<void> => {
    await sheetRepository.updateTotalSheet(id, sheet)
}
