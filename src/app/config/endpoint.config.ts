const urlLocal = 'http://localhost:3000/api';

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
  auth: `${urlLocal}/ingresar`,
  passangers: `${urlLocal}/pasajeros`,
} as const;
