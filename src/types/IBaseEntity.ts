import { IEmpresa } from './IEmpresa';
import { IPromocion } from './IPromocion';
import { ISucursal } from './ISucursal';
import { IUsuario } from './IUsuario';

export type Entidades = IUsuario | ISucursal | IEmpresa | IPromocion;
export interface IBaseEntity {
    id: number;
    eliminado: boolean;
}