export interface ICurrentAccount{
    account_id: string;
    balance: number | null;
    created_at: Date | null;
    status: string;
    decouvert: number | null;
    customer_id: number | null;
}