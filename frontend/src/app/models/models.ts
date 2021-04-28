export interface PaginationOffer {
  pagination: Pagination;
  results: Offer[];
}

// export interface Pagination {
//   count: number;
//   next: string;
//   previous: string;
//   limit: number;
// }

export interface Pagination {
  page: number;
  size: number;
  count: number;
  // lastPage: number;
}

export interface Offer {
  id?: number;
  car: Car;
  customer: Customer;
  broker: Broker;
  employee: Employee;
  vin: string;
  pay_for_transport: Date | string;
  ship_documents_to_agency: Date | string;
  additional_data: string;
  over_fracht: number;
  over_odprawa: number;
  over_transport_to_pl: number;
  over_hst: number;
}

export interface EditOffer {
  id?: number;
  pay_for_transport: Date | string;
  ship_documents_to_agency: Date | string;
  additional_data: string;
  over_fracht: number;
  over_odprawa: number;
  over_transport_to_pl: number;
  over_hst: number;
}

export interface Car {
  id?: number;
  make: {
    name: string;
  };
  model: string;
  year: string;
}

export interface Vehicle {
  brand: string;
  model: string;
}

export interface Customer {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface Broker {
  id?: number;
  name: string;
}

export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
}


export class User {
  id: number;
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  refreshToken?: string;
}
