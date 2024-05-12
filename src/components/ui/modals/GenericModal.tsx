import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { removeElementActive } from "../../../redux/slices/TablaReducer";
import { FactoryService } from "../../../services/FactoryService";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import { Modal, Button, Form } from "react-bootstrap";
import "./modal.css";

interface IModalProps<T> {
  modalTitle: string;
  formDetails: {
    initialValues: T;
    translatedPlaceholder: Record<string, string>;
    validationSchema: Yup.ObjectSchema<object>;
    formInputType: Record<string, string>;
  };
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  route: string;
  getItems: () => void;
}

export const GenericModal = <T extends { id: number }>({
  modalTitle,
  formDetails,
  openModal,
  setOpenModal,
  route,
  getItems,
}: IModalProps<T>) => {
  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeElementActive());
  };

  const elementActive = useAppSelector(
    (state) => state.tableReducer.elementActive
  );

  // Invoca al servicio correspondiente según la ruta pasada por parámetro
  const itemService = FactoryService.createService(route);

  const handleSubmit = async (values: T) => {
    if (elementActive) {
      await itemService.put(elementActive.id, values);
    } else {
      await itemService.post(values);
    }
    // recarga la tabla con los cambios realizados
    getItems();
  };

  const dispatch = useAppDispatch();

  // const values = { valores de prueba
  //     name: 'text',
  //     price: 5,
  //     description: 'text',
  //     category: 'text',
  //     image: null,
  //     stock: 5,
  // }
  return (
    <div>
      <Modal
        id={"modal"}
        show={openModal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={formDetails.validationSchema}
            initialValues={formDetails.initialValues}
            enableReinitialize={true}
            onSubmit={async (values) => {
              await handleSubmit(values);
              handleClose();
            }}
          >
            {() => (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div className="container_Form_Ingredientes">
                    {/* Campos del formulario */}
                    {Object.keys(formDetails.initialValues).map(
                      (key: string) =>
                        key !== "id" &&
                        key !== "active" &&
                        key !== "actions" && (
                          <Field
                            key={key}
                            label={key}
                            name={key}
                            type={formDetails.formInputType[key]}
                            placeholder={formDetails.translatedPlaceholder[key]}
                            // value={values[key]} En caso de tener que cargar los valores para editar, usamos value
                          />
                        )
                    )}
                    {/* Botón para enviar el formulario */}
                    <div className="d-flex justify-content-end">
                      <Button variant="success" type="submit">
                        Enviar
                      </Button>
                    </div>
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
