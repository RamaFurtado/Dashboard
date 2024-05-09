import React, { useEffect, useState } from "react";
import { ProductoService } from "../../../services/ProductoService";
import { useAppDispatch } from "../../../hooks/redux";
import { IProducto } from "../../../types/IProducto";
import Swal from "sweetalert2";
import { setDataTable } from "../../../redux/slices/TablaReducer";
import { Button } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import TableGeneric from "../../ui/TableGeneric/TableGeneric";
import { ModalProducto } from "../../ui/modals/ModalProducto/ModalProducto";

const API_URL = import.meta.env.VITE_API_URL;

export const SeccionProductos = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const productoService = new ProductoService(API_URL + "/products");
  const dispatch = useAppDispatch();

  const ColumnsProducto = [
    {
      label: "id",
      key: "id",
      render: (producto: IProducto) => (producto?.id ? producto.id : 0),
    },
    { label: "Nombre", key: "name" },
    { label: "Precio", key: "price" },
    { label: "Descripción", key: "description" },
    { label: "Categoría", key: "category" },
    {
      label: 'Imagen',
      key: 'image',
      render: (producto: IProducto) => (
        <img
          src={producto.image}
          alt={producto.name}
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
      ),
    },
    { label: "Stock", key: "stock" },
    {
      label: "Acciones", key: "actions",},
    {label: "Estado", key: "active"},
  ];

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
        await productoService.logicDelete(id).then(() => {
          getProducto();
        });
      }
    });
  };

  const getProducto = async () => {
    await productoService.getAll().then((productoData) => {
      dispatch(setDataTable(productoData));
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getProducto();
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
          <TableGeneric<IProducto>
            handleDelete={handleDelete}
            columns={ColumnsProducto}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
      <ModalProducto
        getProductos={getProducto}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
