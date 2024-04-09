export interface Iitem {
    id: number,
    sku: string,
    name:string,
    details?: string,
    quantity: number,
    stores: IStores,
    history: IHistory[]
}

export interface IStores {
  id: number,
  name: string,
  shipperCode?: string,
  shipperName?: string,
  zipCode: string,
  phoneNumber: string,
  email: string,
  isDelete: boolean
}

export interface IResult<T>{
  data:T
}

export interface IHistory {
  id: number;
  lot: string;
  order: string;
  outDate: string;
  quantity: number;
  remark: string;
  item: Iitem;
}

export interface IPack {
  id: number;
  item: Iitem;
  quantity: number;
}
