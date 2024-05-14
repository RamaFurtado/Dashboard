export interface IEmpresa extends IBaseEntity {
    description: string;
    cuit: number;
    image: string;
    actions: string;
    active: boolean;
}