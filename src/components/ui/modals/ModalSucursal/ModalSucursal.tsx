import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

interface IDomicilio {
  calle: string;
  numero: number;
  cp: number;
  piso: number;
  nroDpto: number;
  idLocalidad: number;
}

interface ISucursal {
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  domicilio: IDomicilio;
  idEmpresa: number;
}

interface ISucursalModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (sucursal: ISucursal) => void;
}

export const ModalSucursal = ({ show, handleClose, handleSubmit }: ISucursalModalProps) => {
    const idEmpresa = useParams().id;
  const [formData, setFormData] = useState<ISucursal>({
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    esCasaMatriz: true,
    domicilio: {
      calle: "",
      numero: 0,
      cp: 0,
      piso: 0,
      nroDpto: 0,
      idLocalidad: 0,
    },
    idEmpresa: Number(idEmpresa),
  });

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Campo requerido"),
    horarioApertura: Yup.string().required("Campo requerido"),
    horarioCierre: Yup.string().required("Campo requerido"),
    domicilio: Yup.object().shape({
      calle: Yup.string().required("Campo requerido"),
      numero: Yup.number().required("Campo requerido"),
      cp: Yup.number().required("Campo requerido"),
      piso: Yup.number(),
      nroDpto: Yup.number(),
      idLocalidad: Yup.number().required("Campo requerido"),
    }),
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleCloseModal = () => {
    formik.resetForm();
    handleClose();
  };

  const handleDomicilioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      domicilio: {
        ...formData.domicilio,
        [name]: value,
      },
    });
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Nueva Sucursal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              isInvalid={formik.touched.nombre && !!formik.errors.nombre}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="horarioApertura">
            <Form.Label>Horario de Apertura</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el horario de apertura"
              name="horarioApertura"
              value={formik.values.horarioApertura}
              onChange={formik.handleChange}
              isInvalid={formik.touched.horarioApertura && !!formik.errors.horarioApertura}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.horarioApertura}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="horarioCierre">
            <Form.Label>Horario de Cierre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el horario de cierre"
              name="horarioCierre"
              value={formik.values.horarioCierre}
              onChange={formik.handleChange}
              isInvalid={formik.touched.horarioCierre && !!formik.errors.horarioCierre}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.horarioCierre}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="esCasaMatriz">
            <Form.Check
              type="checkbox"
              label="Es Casa Matriz"
              name="esCasaMatriz"
              checked={formik.values.esCasaMatriz}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <hr />
          <h4>Domicilio</h4>
          <Form.Group controlId="calle">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la calle"
              name="calle"
              value={formData.domicilio.calle}
              onChange={handleDomicilioChange}
              isInvalid={formik.touched.domicilio?.calle && !!formik.errors.domicilio?.calle}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.domicilio?.calle}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="numero">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el número"
              name="numero"
              value={formData.domicilio.numero}
              onChange={handleDomicilioChange}
              isInvalid={formik.touched.domicilio?.numero && !!formik.errors.domicilio?.numero}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.domicilio?.numero}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="cp">
            <Form.Label>CP</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el CP"
              name="cp"
              value={formData.domicilio.cp}
              onChange={handleDomicilioChange}
              isInvalid={formik.touched.domicilio?.cp && !!formik.errors.domicilio?.cp}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.domicilio?.cp}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="piso">
            <Form.Label>Piso</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el piso"
              name="piso"
              value={formData.domicilio.piso}
              onChange={handleDomicilioChange}
              isInvalid={formik.touched.domicilio?.piso && !!formik.errors.domicilio?.piso}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.domicilio?.piso}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="nroDpto">
            <Form.Label>Nro. Depto</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el número de departamento"
              name="nroDpto"
              value={formData.domicilio.nroDpto}
              onChange={handleDomicilioChange}
              isInvalid={formik.touched.domicilio?.nroDpto && !!formik.errors.domicilio?.nroDpto}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.domicilio?.nroDpto}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="idLocalidad">
            <Form.Label>Localidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el ID de la localidad"
              name="idLocalidad"
              value={formData.domicilio.idLocalidad}
              onChange={handleDomicilioChange}
              isInvalid={formik.touched.domicilio?.idLocalidad && !!formik.errors.domicilio?.idLocalidad}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.domicilio?.idLocalidad}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};