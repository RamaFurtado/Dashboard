import React, { useEffect } from "react";
import { ProductoService } from "../../../services/ProductoService";
import Switch from "@mui/material/Switch";
import { CircularProgress } from "@mui/material";
const API_URL = import.meta.env.VITE_API_URL;

const productoService = new ProductoService(API_URL + "/products");

interface ISwitchButton {
  id: number;
  currentState: boolean;
}

export const SwitchButton = ({ id, currentState }: ISwitchButton) => {
  const [active, setActive] = React.useState<boolean>(currentState);
  const [message, setMessage] = React.useState<string>(
    currentState ? "Activo" : "Inactivo"
  );
  const [loader, setLoader] = React.useState<boolean>(false);

  const handleClick = async () => {
    setLoader(true); // Activar el loader antes de las operaciones asincrónicas
    setMessage("");
    try {
      if (active) {
        await productoService.logicDelete(id);
        setMessage("Inactivo");
        console.log("Dada de baja correcta");
      } else {
        await productoService.logicRestore(id);
        setMessage("Activo");
        console.log("Dada de alta correcta");
      }
      setActive(!active);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false); // Desactivar el loader después de las operaciones asincrónicas
    }
  };
  return (
    <div>
      {message}
      {loader ? <CircularProgress/> : (
                <Switch
                    checked={active} // Utiliza el estado local 'active' para controlar el estado del Switch
                    onChange={() => handleClick()}
                />
            )}
    </div>
  );
};
