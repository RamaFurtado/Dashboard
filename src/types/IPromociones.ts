export interface IPromocion{
    id: number;
    image: string;
    name: string;
    since: string;
    until: string;
    description: string;
    price: number;
    actions: string;
    active: boolean;
}