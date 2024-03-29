import { environment } from 'environments/environment';

const urlLocal = `${environment.apiUrl}/api`;

export const EndpointsRoutes = {
  brand: `${urlLocal}/marcas`,
  colors: `${urlLocal}/colors`,
  models: `${urlLocal}/modelos`,
  client: `${urlLocal}/clientes`,
  driver: `${urlLocal}/conductores`,
  vehicles: `${urlLocal}/vehiculos`,
  fuelType: `${urlLocal}/tipos-combustible`,
  typeVehicles: `${urlLocal}/tipos-vehiculo`,
  licenseCategory: `${urlLocal}/brevete-categoria`,
  areas: `${urlLocal}/areas`,
  trip: `${urlLocal}/viajes`,
  auth: `${urlLocal}/auth`,
  passangers: `${urlLocal}/pasajeros`,
  users: `${urlLocal}/usuarios`,
  roles: `${urlLocal}/roles`,
} as const;
