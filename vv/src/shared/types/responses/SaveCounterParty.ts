export type SaveCounterParty = {
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
    Description: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Counterparty: string;
    OwnershipForm: string;
    OwnershipFormDescription: string;
    EDRPOU: string;
    CounterpartyType: string;
    ContactPerson: {
                success: boolean,
                data: [
                    {
                        Ref: string,
                        "Description": string,
                        "LastName": string,
                        "FirstName": string,
                        "MiddleName": string
                    }
                ];
  };
}
  
//   type ContactPersonItem = { scalar: boolean } | {
//         "0": ContactPersonDetails;
//       };
  
//   type ContactPersonDetails = {
//     Description: string;
//     Ref: string;
//     LastName: string;
//     FirstName: string;
//     MiddleName: string;
//   };
  