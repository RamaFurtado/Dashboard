import React from 'react';
import { IInsumo } from '../../../../types/IInsumo';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { removeElementActive } from '../../../../redux/slices/TablaReducer';
import { InsumoService } from '../../../../services/InsumoService';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { Modal, Button, Form } from 'react-bootstrap';
import "../modal.css"

const API_URL = import.meta.env.VITE_API_URL;

const insumoService = new InsumoService(API_URL + '/supplies');

interface IModalInsumo {
  getInsumos: () => void; // Función para obtener los insumos
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const ModalInsumo = ({
  getInsumos,
  openModal,
  setOpenModal,
}: IModalInsumo) => {
  const initialValues: IInsumo = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    stock: 0,
    actions: '',
    active: true,
  };

  const [active, setActive] = React.useState<boolean>(true);

  const actualDate: string = new Date().toISOString().split('T')[0];
  // Debes definir la lógica para tu servicio API de insumos
  const apiInsumo = new InsumoService(API_URL + '/supplies');

  const elementActive = useAppSelector(
    (state) => state.tableReducer.elementActive
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeElementActive());
  };

  // const handleSubmit = async (values: IInsumo) => {
  //   if (elementActive) {
  //     await insumoService.put(elementActive.id, values);
  //   } else {
  //     await insumoService.post(values);
  //   }
  //   getInsumos();
  //   handleClose();
  // };

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
            <Modal.Title>Editar un insumo:</Modal.Title>
          ) : (
            <Modal.Title>Añadir un insumo:</Modal.Title>
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
            })}
            initialValues={elementActive ? elementActive : initialValues}
            enableReinitialize={true}
            onSubmit={async (values: IInsumo) => {
              // Enviar los datos al servidor al enviar el formulario
              if (elementActive) {
                // Aquí debes usar tu servicio API de insumos para actualizar un insumo existente
                await insumoService.put(elementActive.id, values);
              } else {
                // Aquí debes usar tu servicio API de insumos para agregar un nuevo insumo
                await insumoService.post(values);
              }
              // Obtener los insumos actualizados y cerrar el modal
              getInsumos();
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
                    <Button variant="success" type="submit" >
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

