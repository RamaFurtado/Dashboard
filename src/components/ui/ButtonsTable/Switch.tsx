import React, { useEffect } from 'react'
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
    const [message, setMessage] = React.useState<string>(currentState ? 'Activo' : 'Inactivo');

    const handleClick = async () => {
        console.log(active)
        console.log(id)
        if (active) {
            productoService.logicDelete(id);
            await setMessage('Inactivo');
        } else {
            productoService.logicRestore(id);
            await setMessage('Activo');
        }
        setActive(!active);
    }

    return (
        <div>
            {message}

            {currentState ? <Switch onClick={() => { handleClick() }} defaultChecked /> : <Switch onClick={() => { handleClick() }} />}
        </div>
    )
}
