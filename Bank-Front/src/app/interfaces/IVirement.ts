export interface IVirement{
    account_sender: string | undefined;
    account_receiver: string | undefined;
    amount: number;
    description: string;
    favorite: boolean;
    libele: string;
}