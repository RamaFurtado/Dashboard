export interface ICategories {
    id: number;
    name: string;
    subcategories?: ICategories[];
    active: boolean;
  }