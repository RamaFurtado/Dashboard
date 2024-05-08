import React from 'react'
import { ProductoService } from '../../../services/ProductoService';
import Switch from '@mui/material/Switch';
const API_URL = import.meta.env.VITE_API_URL;

const productoService = new ProductoService(API_URL + '/products');


export const SwitchButton = (id: number) => {
    const [active, setActive] = React.useState<boolean>(true);

    const handleClick = () => {
        console.log(active)
        if (active) {
            productoService.logicDelete(id);
        } else {
            productoService.logicRestore(id);
        }
        setActive(!active);
    }
    return (
        <div>
            {active ? <Switch onClick={() => { handleClick }} defaultChecked /> : <Switch onClick={() => { handleClick }} />}
        </div>
    )
}
