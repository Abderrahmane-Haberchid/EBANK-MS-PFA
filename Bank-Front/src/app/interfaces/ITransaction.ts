export interface ITransaction {
    operationId: number;
    type: string;
    operationDate: Date,
    amount: number,
    favorite: string,
    description: string,
    accountId: string,
    libele: string;
}