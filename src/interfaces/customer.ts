export type Customer = {
  customerId: number;
  taxIdentificationNumber:string;
  companyName: string;
  legalAddress: string;
  postalCode: string;
  country: string;
  email: string;
  password: string;
  deliveryAddresses: any ;
  active: boolean;

  //active: boolean;
 // activationCode: string;
  //activationCodeCreationTime: string;
  //deliveryAddresses: any; //DeliveryAddress[]


}