import * as React from 'react';
import List from '@mui/material/List';
import { CategoryItem } from './CategoryItem';
import { ICategories } from '../../../types/ICategories';


//Poblamos a categorías como si viniera de la base de datos
const categories: ICategories[] = [
  {
    id: 1,
    name: "Hamburguesas",
    subcategories: [
      {
        id: 11,
        name: "Clásicas",
      },
      {
        id: 12,
        name: "Veganas",
        subcategories: [
          {
            id: 121,
            name: "De lentejas",
          },
          {
            id: 122,
            name: "De garbanzos",
          },
        ],
      },
      {
        id: 13,
        name: "Gourmet",
        subcategories: [
          {
            id: 131,
            name: "Con fritas",
          },
          {
            id: 132,
            name: "Con huevo",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Lomos",
    subcategories: [
      {
        id: 21,
        name: "Completos",
      },
      {
        id: 22,
        name: "A caballo",
      },
      {
        id: 23,
        name: "Al plato",
      },
    ],
  },
  {
    id: 3,
    name: "Empanadas",
    subcategories: [
      {
        id: 31,
        name: "De carne",
      },
      {
        id: 32,
        name: "De pollo",
      },
      {
        id: 33,
        name: "De humita",
      },
    ],
  },
  {
    id: 4,
    name: "Pizzas",
    subcategories: [
      {
        id: 41,
        name: "Muzas",
      },
      {
        id: 42,
        name: "Especiales",
        subcategories: [
          {
            id: 421,
            name: "Con huevo frito",
          },
          {
            id: 422,
            name: "Con papas fritas",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Bebidas",
    subcategories: [
      {
        id: 51,
        name: "Gaseosas",
      },
      {
        id: 52,
        name: "Cervezas",
      },
      {
        id: 53,
        name: "Vinos",
      },
    ],
  },
];



export function SeccionCategorias() {

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav" aria-labelledby="nested-list-subheader">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} padding={2} />
      ))}
    </List>
  );
}
