import { EmpresaService } from "./EmpresaService";
import { InsumoService } from "./InsumoService";
import { ManufacturadoService } from "./ManufacturadoService";
import { PromocionService } from "./PromocionService";
import { SucursalService } from "./SucursalService";
import { UsuarioService } from "./UsuarioService";

const API_URL = import.meta.env.VITE_API_URL;

const getServiceClass = (route: string) => {
  switch (route) {
    case "empresa":
      return EmpresaService;
    case "sucursal":
      return SucursalService;
    case "manufacturado":
      return ManufacturadoService;
    case "insumo":
      return InsumoService;
    case "promocion":
      return PromocionService;
    case "usuario":
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
