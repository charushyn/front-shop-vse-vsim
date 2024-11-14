export type SaveInternetDocument = {
    success: boolean;
    data: DataItem[];
    errors: string[];
    warnings: string[];
    info: string[];
    messageCodes: string[];
    errorCodes: string[];
    warningCodes: string[];
    infoCodes: string[];
  };
  
  type DataItem = {
    Ref: string;
    CostOnSite: string;
    EstimatedDeliveryDate: string;
    IntDocNumber: string;
    TypeDocument: string;
  };
  