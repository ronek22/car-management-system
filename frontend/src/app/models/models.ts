export interface Offer {
  id?: number;
  car: Car;
  customer: Customer;
  broker: Broker;
  employee: Employee;
  vin: string;
  pay_for_transport: Date|string;
  ship_documents_to_agency: Date|string;
  additional_data: string;
  over_fracht: number;
  over_odprawa: number;
  over_transport_to_pl: number;
  over_hst: number;
}

export interface Car {
  make: {
    name: string;
  };
  model: string;
  year: string;
}

export interface Customer {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface Broker {
  name: string;
}

export interface Employee {
  first_name: string;
  last_name: string;
}
