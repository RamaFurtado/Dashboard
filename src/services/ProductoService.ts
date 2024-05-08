import { IProducto } from "../types/IProducto";
import { BackendClient } from "./BackendClient";


export class ProductoService extends BackendClient<IProducto> {

    // Método para dada de baja lógica de un elemento por su ID
    async logicDelete(id: number): Promise<void> {
        const element = await this.getById(id);
        if (element) {
            element.active = false;
            await this.put(id, element);
        }
    }
}