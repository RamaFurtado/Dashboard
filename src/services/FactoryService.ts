import { EmpresaService } from "./EmpresaService";
import { InsumoService } from "./InsumoService";
import { ManufacturadoService } from "./ManufacturadoService";
import { PromocionService } from "./PromocionService";
import { UsuarioService } from "./UsuarioService";

const API_URL = import.meta.env.VITE_API_URL;

const getServiceClass = (route: string) => {
  switch (route) {
    case "company":
      return EmpresaService;
    case "manufactured":
      return ManufacturadoService;
    case "supplies":
      return InsumoService;
    case "sales":
      return PromocionService;
    case "users":
      return UsuarioService;
    default:
      throw new Error(`Ruta no válida: ${route}`);
  }
};

export class FactoryService {
  static createService(route: string) {
    const ServiceClass = getServiceClass(route);
    return new ServiceClass(API_URL + "/" + route);
  }
}
