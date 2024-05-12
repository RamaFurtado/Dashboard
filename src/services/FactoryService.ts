import { EmpresaService } from "./EmpresaService";
import { ProductoService } from "./ProductoService";
import { PromocionService } from "./PromocionService";
import { UsuarioService } from "./UsuarioService";

const API_URL = import.meta.env.VITE_API_URL;

const routes: { [key: string]: any } = {
    products: ProductoService,
    promotions: PromocionService,
    company: EmpresaService,
    user: UsuarioService,
}

// Factory Service funciona llamando al servicio correspondiente 
// según la ruta que se le pase por parámetro
export class FactoryService {
    static createService(route: string) {
        return new routes[route](API_URL + '/' + route);
    }
}