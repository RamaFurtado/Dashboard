
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import React from 'react';
import { ICategories } from '../../../types/ICategories';
import { List } from '@mui/material';
// import "./category.css";

interface CategoryItemProps {
    category: ICategories,
    padding: number,
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ category, padding }) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => setOpen(!open);

    return (
        <>
            {/* ListItemButton es un botón común que puede tener o no flecha de subcategorías */}
            <ListItemButton sx={{ pl: padding }} onClick={handleClick}>
                <ListItemIcon>
                    <GridViewOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={category.name} />
                {/* Si existe subcategoría, agrega un icono de flecha de subcategorías */}
                {category.subcategories && category.subcategories.length > 0
                    ? open ? <ExpandLess /> : <ExpandMore /> : null
                }
            </ListItemButton>
            {/* Si existe subcategoría, agrega el componente colapsable con las subcategorías basado en el botón de arriba */}
            {category.subcategories && category.subcategories.length > 0 && (
                <>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {category.subcategories.map((subcategory) => (
                                // Vuelve a llamar al componente recursivamente en caso de que existan subcategorías en subcategorías
                                <CategoryItem
                                    key={subcategory.id}
                                    category={subcategory}
                                    padding={padding ? padding + 4 : 4}
                                />
                            ))}
                        </List>
                    </Collapse>
                </>
            )}
        </>
    );
};
