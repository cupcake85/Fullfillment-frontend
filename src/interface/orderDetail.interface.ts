export interface IorderDetail {
    id: number;
    customerName: string;
    orderDate: string;
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
    status: string;
    quantity: number;
    orderno: Orderno[];
  }
  
  export interface Orderno {
    id: number;
    quantity: number;
    item: Item;
  }
  
  export interface Item {
    id: number;
    sku: string;
    name: string;
    details: string;
    quantity: number;
    stores: Stores;
  }
  
  export interface Stores {
    id: number;
    name: string;
    shipperCode: string;
    shipperName: string;
    zipCode: string;
    phoneNumber: string;
    email: string;
    isDelete: boolean;
  }