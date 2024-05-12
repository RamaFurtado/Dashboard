import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { SucursalService } from "../../../services/SucursalService";
import { useAppDispatch } from "../../../hooks/redux";
import { setDataTable } from "../../../redux/slices/TablaReducer";
import { Loader } from "../../ui/Loader/Loader";
import { GenericCards } from "../../ui/Generic/GenericCards/GenericCard";
import { ISucursales } from "../../../types/ISucursal";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const SeccionSucursal = () => {

  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const sucursalSevice = new SucursalService(API_URL + "/branch");
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate('/app')
  }
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `¿Seguro que quieres eliminar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await sucursalSevice.delete(id).then(() => {
          getSucursal();
        });
      }
    });
  };

  const getSucursal = async () => {
    await sucursalSevice.getAll().then((sucursalData) => {
      dispatch(setDataTable(sucursalData));
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getSucursal();
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            padding: ".4rem",
            display: "flex",
            justifyContent: "flex-end",
            width: "90%",
          }}
        ></div>
        {/* Mostrar indicador de carga mientras se cargan los datos */}
        {loading ? (
          <Loader />
        ) : (
          // Mostrar la tabla de personas una vez que los datos se han cargado
          <GenericCards<ISucursales>
            handleClick={handleClick}
            handleDelete={handleDelete}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </>
  );
};

export default SeccionSucursal;
