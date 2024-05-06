import { useState } from "react";
import { EmpresaService } from "../../../services/EmpresaService";
import { useAppDispatch } from "../../../hooks/redux";
import { IEmpresa } from "../../../types/IEmpresa";
import Swal from "sweetalert2";
import { setDataTable } from "../../../redux/slices/TablaReducer";
import { Button } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import TableGeneric from "../../ui/TableGeneric/TableGeneric";


const API_URL = import.meta.env.VITE_API_URL;

export const SeccionEmpresa = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const empresaService = new EmpresaService(API_URL + "/company");
  const dispatch = useAppDispatch();

  const ColumnsEmpresa =[
    {
      label: "id",
      key: "id",
      render: (empresa: IEmpresa) => (empresa?.id ? empresa.id : 0),
    },
    {
      label: "Nombre",
      key: "name",
    },
    {
      label: "Razon social",
      key: "description",
    },
    {
      label: "CUIT",
      key: "cuil",
    }
  ]

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
        await empresaService.delete(id).then(() => {
          getEmpresa();
        });
      }
    });
  };

  const getEmpresa = async () => {
    await empresaService.getAll().then((empresaData) => {
      dispatch(setDataTable(empresaData));
      setLoading(false);
    });
  };

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
        >
          {/* Botón para abrir el modal de agregar persona */}
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
            variant="contained"
          >
            Agregar
          </Button>
        </div>
        {/* Mostrar indicador de carga mientras se cargan los datos */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "2vh",
              height: "100%",
            }}
          >
            <CircularProgress color="secondary" />
            <h2>Cargando...</h2>
          </div>
        ) : (
          // Mostrar la tabla de personas una vez que los datos se han cargado
          <TableGeneric<IEmpresa>
            handleDelete={handleDelete}
            columns={ColumnsEmpresa}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
      {/* <ModalEmpresa
        getProductos={getEmpresa}
        openModal={openModal}
        setOpenModal={setOpenModal}
      /> */}
    </>
  );
}