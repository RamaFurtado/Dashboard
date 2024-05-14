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
      return EmpresaService as typeof EmpresaService;
    case "sucursal":
      return SucursalService as typeof SucursalService;
    case "manufacturado":
      return ManufacturadoService as typeof ManufacturadoService;
    case "insumo":
      return InsumoService as typeof InsumoService;
    case "promocion":
      return PromocionService as typeof PromocionService;
    case "usuario":
      return UsuarioService as typeof UsuarioService;
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
