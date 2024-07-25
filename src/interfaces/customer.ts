    export type Customer = {
    taxIdentificationNumber?: string;//TODO ? need or not?
    companyName: string;
    legalAddress: string;
    postalCode: string;
    country: string;
    deliveryAddresses: string; //DeliveryAddress[]
    address: string;
    contactPerson: string;
  }