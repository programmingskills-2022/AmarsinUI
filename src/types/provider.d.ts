export type ProviderItem= {
    id: number;
    name: string;
    cnt: number;
    total: number;
    offerCnt: number;
  };

export type ProviderList = {
    err: number;
    msg: string;
    rpProviders: ProviderItem[];
  };

  export interface ProviderListRequest {
    accSystem: number;
    accYear: number;
    brandId: number;
    sanadKind: number;
    fDate: string;
    tDate: string;
  }
  
  
  export interface ProviderState extends ProviderListRequest{
      providerList:ProviderList
      setField: (field: keyof ProviderListRequest, value: any) => void;
      setProviderList:(providerList:RpProviderListResponse) =>void
      
  }