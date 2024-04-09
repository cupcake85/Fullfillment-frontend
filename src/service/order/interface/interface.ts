export interface CreateOrder {
    customerName: string;
    uom: string;
    cod: number;
    phoneNumber: string;
    address: string;
    alley: string;
    road: string;
    zipCode: string;
    province: string;
    district: string;
    parish: string;
    country: string;
    startDate: Date;
    endDate: Date;
    status: string;
    storesName: string;
    item: Item[];
    
}

interface Item {
    itemId:number;
    qty:number;
}