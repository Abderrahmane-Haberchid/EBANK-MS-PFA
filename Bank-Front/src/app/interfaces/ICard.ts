export interface ICard {
     isEnabled: boolean;
     onlinePayment: boolean;
     internationalPayment: boolean;
     bypasse: boolean;
     createdAt: Date|null;
     expirationDate: Date|null;
     customerId: number|null;
}