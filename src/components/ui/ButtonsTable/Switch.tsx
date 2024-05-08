import React from 'react'
import { ProductoService } from '../../../services/ProductoService';
import Switch from '@mui/material/Switch';
const API_URL = import.meta.env.VITE_API_URL;

const productoService = new ProductoService(API_URL + '/products');

interface ISwitchButton {
    id: number;
    currentState: boolean;
}

export const SwitchButton = ({ id, currentState }: ISwitchButton) => {
    const [active, setActive] = React.useState<boolean>(true);

    const handleClick = () => {
        console.log(active)
        console.log(id)
        if (active) {
            productoService.logicDelete(id);
        } else {
            productoService.logicRestore(id);
        }
        setActive(!active);
    }
    return (
        <div>
            {currentState ? <Switch onClick={() => { productoService.logicDelete(id); console.log(id) }} defaultChecked /> : <Switch onClick={() => { productoService.logicRestore(id) }} />}
        </div>
    )
}
