export interface IInsumo {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    stock: number;
    actions: string;
    active: boolean;
}