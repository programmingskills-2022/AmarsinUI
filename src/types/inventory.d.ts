export interface InventoryItem {
  id: number | string;
  bn: string;
  fn: string;
  s: string;
  ns: number;
  c: number;
  uid: string;
  gtin: string;
  ed: string;
}

export interface InventoryList {
  err: number;
  msg: string;
  rpProviderInventories: InventoryItem[];
}

export interface InventoryListRequest {
  accSystem: number;
  accYear: number;
  brandId: number;
}


export interface InventoryState extends InventoryListRequest{
    inventoryList:InventoryList
    setField: (field: keyof InventoryListRequest, value: any) => void;
    setInventoryList:(inventoryList:InventoryList) =>void
    
}