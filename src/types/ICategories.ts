export interface ICategories extends IBaseEntity {
  subcategories?: ICategories[];
}