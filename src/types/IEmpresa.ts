import { IBaseEntity } from "./IBaseEntity";

export interface IEmpresa extends IBaseEntity {
    nombre: string;
    razonSocial: string;
    cuil: number;
    actions: string;
}
// ASI LO RETORNA EL JSON DESDE JAVA
//         "id": 1,
//         "eliminado": false,
//         "nombre": "A",
//         "razonSocial": "A",
//         "cuil": 24234432344