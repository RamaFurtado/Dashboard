import { IProducto } from "../types/IProducto";
import { BackendClient } from "./BackendClient";


export class ProductoService extends BackendClient<IProducto> {}