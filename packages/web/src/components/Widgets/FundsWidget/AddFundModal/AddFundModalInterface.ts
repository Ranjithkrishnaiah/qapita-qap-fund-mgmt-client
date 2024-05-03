export interface addFundInterface {
  name: {
    brandName: string;
    legalName: string;
  };
  incorporationDetails: {
    country: string;
    corporateNumber: string;
    address: string;
  };
  fundSize: {
    currency: string;
    amount: number;
  };
  reportingCurrency: string;
  websiteUrl: string;
  managementFee: {
    currency: string;
    amount: number;
  };
  contactPerson: string;
  email: string;
  phoneNumber: number;
  carry: number;
  additionalMemo: string;
  hurdleTask: number;
}
