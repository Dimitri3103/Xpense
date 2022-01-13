export default class Group {
    id?: string;
    name?: string;
    members?: string[] = [];
    supervisors?: string[] = [];
    expenseTypes?: string[] = [];
    orgId?: string;
}