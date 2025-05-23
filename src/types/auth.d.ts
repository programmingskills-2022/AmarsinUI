export interface LoginRequest {
  userName: string;
  pass: string;
  playerId: string;
  customerTyp: number;
  appVer: string;
  xCustomerCode: string;
  isAppConfig: boolean;
  menu:boolean
  initData:boolean
}

export interface AuthState extends LoginRequest {
  token: string | null;
  errorCode:number;
  message:string
  isAuthenticated: boolean;
  authApiResponse:AuthApiResponse|null
  setField: (field: keyof LoginRequest, value: any) => void;
  setToken: (token: string) => void;
  setAuthApiResponse: (authApiResponse: AuthApiResponse) => void;
  setError:(errorCode:number,message:string)=>void
  logout: () => void;
} 

export interface AuthApiResponse {
  meta: {
    errorCode: number;
    message: string;
    type: string;
  };
  data: {
    result: {
      login: {
        usrId: number;
        nam: string;
        admin: boolean;
        hasPaySystemPerm: boolean;
        customerId: number;
        chartId: number;
        orgUnitId: number;
        orgUnitName: string;
        hasCartablePermission: boolean;
        hasMySalaryPermission: boolean;
        token: string;
      };
      appConfig: {
        id: number;
        acc_System: number;
        systemTitle: string;
        acc_Year: number;
        saleStock: boolean;
        hasStock: boolean;
        txtStock: boolean;
        getQuantity: boolean;
        getOffer: boolean;
        hasDecimal: boolean;
        getAmount: boolean;
        urlImage: string;
        urlProductImages: string;
        urlCategoryImages: string;
        logoUrl: string;
        userDisplayName: string;
        perms: string;
      };
      menu: Array<{
        id: number;
        pId: number;
        name: string;
        path: string;
      }>;
      initData: {
        systemId: number;
        systemTitle: string;
        chartId: number;
        chartTitle: string;
        yearId: number;
        yearTitle: string;
      };
    };
  };
}
