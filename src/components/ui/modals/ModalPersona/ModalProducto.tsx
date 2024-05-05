import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { IProducto } from '../../../../types/IProducto';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { removeElementActive } from '../../../../redux/slices/TablaReducer';
import { ProductoService } from '../../../../services/ProductoService';

const API_URL = import.meta.env.VITE_API_URL;

interface IModalProducto {
  getProductos: Function; // Función para obtener los productos
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const ModalProducto = ({
  getProductos,
  openModal,
  setOpenModal,
}: IModalProducto) => {
  const initialValues: IProducto = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    stock: 0,
  };

  const actualDate: string = new Date().toISOString().split('T')[0];
  // Debes definir la lógica para tu servicio API de productos
  const apiProducto = new ProductoService(API_URL + '/products');

  const elementActive = useAppSelector(
    (state) => state.tableReducer.elementActive
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeElementActive());
  };

  return (
    <div>
      <Modal
        id={'modal'}
        show={openModal}
        onHide={handleClose}
        size={'lg'}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          {elementActive ? (
            <Modal.Title>Editar un producto:</Modal.Title>
          ) : (
            <Modal.Title>Añadir un producto:</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              name: Yup.string().required('Campo requerido'),
              price: Yup.number().required('Campo requerido').min(0, 'El precio debe ser mayor o igual a 0'),
              description: Yup.string().required('Campo requerido'),
              category: Yup.string().required('Campo requerido'),
              image: Yup.string().required('Campo requerido'),
              stock: Yup.number().required('Campo requerido').min(0, 'El stock debe ser mayor o igual a 0'),
              // Puedes agregar más validaciones según sea necesario para los otros campos
            })}
            initialValues={elementActive ? elementActive : initialValues}
            enableReinitialize={true}
            onSubmit={async (values: IProducto) => {
              // Enviar los datos al servidor al enviar el formulario
              if (elementActive) {
                // Aquí debes usar tu servicio API de productos para actualizar un producto existente
                // await apiProducto.put(elementActive?.id, values);
              } else {
                // Aquí debes usar tu servicio API de productos para agregar un nuevo producto
                // await apiProducto.post(values);
              }
              // Obtener los productos actualizados y cerrar el modal
              getProductos();
              handleClose();
            }}
          >
            {() => (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div className="container_Form_Ingredientes">
                    {/* Campos del formulario */}
                    <Field
                      label="Nombre:"
                      name="name"
                      type="text"
                      placeholder="Nombre"
                    />
                    <Field
                      label="Precio:"
                      name="price"
                      type="text"
                      placeholder="Precio"
                    />

                    <Field
                      label="Descripción:"
                      name="description"
                      type="text"
                      placeholder="Descripción"
                    />

                    <Field
                      label="Categoría:"
                      name="category"
                      type="text"
                      placeholder="Categoría"
                    />
                    <Field
                      label="Imagen:"
                      name="image"
                      type="text"
                      placeholder="Imagen"
                    />
                    <Field
                      label="Stock:"
                      name="stock"
                      type="date"
                      placeholder="Stock"
                    />
                  </div>
                  {/* Botón para enviar el formulario */}
                  <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit">
                      Enviar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

