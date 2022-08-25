export interface DriverResponse {
  data: DriverResponseData[],
  count: number
};

export interface DriverResponseData {
  id_conductor?: number;
  dni: string;
  nombres: string,
  apellidos: string,
  celular: string,
  correo: string,
  breveteCategory?: LicenseData;
  breveteCategoryId?: number;
}

interface LicenseData {
  id_breveteCategory: number;
  breveteCategory: string 
}

export class InvoiceFakeData {
  public static invoices = {
    data: [
      {
        id_conductor: 1,
        nombre: 'Carlos',
        apellidos: 'Morales',
        celular: '987654321',
        correo: 'carlosmorales@gmail.com'
      },
      {
        id_conductor: 2,
        nombre: 'Carlos',
        apellidos: 'Morales',
        celular: '987654321',
        correo: 'carlosmorales@gmail.com'
      },
      {
        id_conductor: 3,
        nombre: 'Carlos',
        apellidos: 'Morales',
        celular: '987654321',
        correo: 'carlosmorales@gmail.com'
      },
      {
        id_conductor: 4,
        nombre: 'Carlos',
        apellidos: 'Morales',
        celular: '987654321',
        correo: 'carlosmorales@gmail.com'
      },
      {
        id_conductor: 5,
        nombre: 'Carlos',
        apellidos: 'Morales',
        celular: '987654321',
        correo: 'carlosmorales@gmail.com'
      },
      {
        id_conductor: 6,
        nombre: 'Carlos',
        apellidos: 'Morales',
        celular: '987654321',
        correo: 'carlosmorales@gmail.com'
      },
      {
        id_conductor: 7,
        nombre: 'Carlos',
        apellidos: 'Morales',
        celular: '987654321',
        correo: 'carlosmorales@gmail.com'
      },
      {
        id_conductor: 8,
        nombre: 'Carlos',
        apellidos: 'Morales',
        celular: '987654321',
        correo: 'carlosmorales@gmail.com'
      },
    ],
    count: 0
  };
}

// {
//   id: 5000,
//   issuedDate: '21 May 2019',
//   client: {
//     address: '6946 Gregory Plaza Apt. 310',
//     company: 'Lambert-Thomas Group',
//     companyEmail: 'mccoymatthew@lopez-jenkins.net',
//     country: 'Vanuatu',
//     contact: '(366) 906-6467',
//     name: 'Ryan Meyer'
//   },
//   service: 'Template Customization',
//   total: 3503,
//   avatar: 'assets/images/avatars/9-small.png',
//   invoiceStatus: 'Paid',
//   balance: 0,
//   dueDate: '22 May 2019'
// }
