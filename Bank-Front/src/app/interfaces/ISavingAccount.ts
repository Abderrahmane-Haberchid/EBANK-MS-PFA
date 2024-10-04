export interface ISavingAccount{
    account_id: string;
    balance: number | null;
    status: string;
    interestRate: number | null;
    customer_id: number | null;
    created_at: Date | null;
}