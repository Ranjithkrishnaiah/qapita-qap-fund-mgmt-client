export interface firmProfileInterface {
  organizationName: {
    brandName: string;
    legalName: string;
  };
  incorporationDetails: {
    country: string;
    corporateNumber: string;
    address: string;
  };
  contactPerson: string;
  contactNumber: number;
  emailId: string;
  websiteUrl: string;
  reportingCurrency: string;
}
