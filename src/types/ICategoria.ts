import { IBaseEntity } from "./IBaseEntity";

export interface ICategoria extends IBaseEntity {
  subCategoria?: ICategoria[];
  active: boolean;
}
