import { AutoMap } from "@nartc/automapper";
import { Expose } from "class-transformer";

class ExpenseType {
    @AutoMap()
    @Expose({ name: '_id' })
    id?: string;
    @AutoMap()
    @Expose()
    code?: string;
    @AutoMap()
    @Expose()
    type?: string
    @AutoMap()
    @Expose()
    multiplicator?: number;
    @AutoMap()
    @Expose()
    i18n?: string;
    @AutoMap()
    @Expose()
    status?: string
    @AutoMap()
    @Expose()
    orgId?: string;
    @AutoMap()
    @Expose()
    attachmentRequired?: boolean;
    @Expose({name: '_rev'})
    rev?: string
}

export default ExpenseType;