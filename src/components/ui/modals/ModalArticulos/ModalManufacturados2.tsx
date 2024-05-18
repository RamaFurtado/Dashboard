import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  removeElementActive,
  setElementActive,
} from "../../../../redux/slices/TablaReducer";
import { FactoryService } from "../../../../services/FactoryService";

interface ManufacturedFormValues {
  id: number;
  eliminado: false;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  actions: string;
  active: boolean;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const steps = ["Información General", "Detalles", "Imágenes"];

const validationSchema = Yup.object({
  name: Yup.string().required("Campo requerido"),
  price: Yup.number().required("Campo requerido"),
  description: Yup.string().required("Campo requerido"),
  category: Yup.string().required("Campo requerido"),
  image: Yup.string().required("Campo requerido"),
  stock: Yup.number().required("Campo requerido"),
});

const initialValues = {
  id: 0,
  name: "",
  price: 0,
  description: "",
  category: "",
  image: "",
  stock: 0,
  actions: "",
  active: true,
};

const translatedPlaceholder = {
  name: "Nombre",
  price: "Precio",
  description: "Descripción",
  category: "Categoría",
  image: "Imagen",
  stock: "Stock",
};

const formInputType = {
  name: "text",
  price: "number",
  description: "text",
  category: "text",
  image: "text",
  stock: "number",
};

export const ModalManufacturado = ({
  getManufacturados,
  openModal,
  setOpenModal,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const elementActive = useAppSelector(
    (state) => state.tableReducer.elementActive
  );
  const itemService = FactoryService.createService("manufactured");
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeElementActive());
  };

  const handleSubmit = async (values: ManufacturedFormValues) => {
    handleClose();
    if (elementActive?.element) {
      await itemService.put(elementActive.element.id, values);
    } else {
      await itemService.post(values);
    }
    getManufacturados();
  };

  const formDetails = {
    validationSchema,
    initialValues: elementActive?.element || initialValues,
    translatedPlaceholder,
    formInputType,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Producto Manufacturado
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Formik
            validationSchema={formDetails.validationSchema}
            initialValues={formDetails.initialValues as ManufacturedFormValues}
            enableReinitialize={true}
            onSubmit={async (values: ManufacturedFormValues) => {
              await handleSubmit(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                {activeStep === 0 && (
                  <>
                    <Field
                      as={TextField}
                      id="outlined-name"
                      label={translatedPlaceholder.name}
                      variant="outlined"
                      fullWidth
                      name="name"
                      value={formDetails.initialValues.name}
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                        if (elementActive) {
                          dispatch(
                            setElementActive({
                              element: {
                                ...elementActive.element,
                                name: e.target.value,
                              },
                            })
                          );
                        }
                      }}
                    />
                    <Field
                      as={TextField}
                      id="outlined-price"
                      label={translatedPlaceholder.price}
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                      name="price"
                      value={formDetails.initialValues.price}
                      type="number"
                      onChange={(e) => {
                        setFieldValue("price", parseFloat(e.target.value));
                        if (elementActive) {
                          dispatch(
                            setElementActive({
                              element: {
                                ...elementActive.element,
                                price: parseFloat(e.target.value),
                              },
                            })
                          );
                        }
                      }}
                    />
                    <Field
                      as={TextField}
                      id="outlined-category"
                      label={translatedPlaceholder.category}
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                      name="category"
                      value={formDetails.initialValues.category}
                      onChange={(e) => {
                        setFieldValue("category", e.target.value);
                        if (elementActive) {
                          dispatch(
                            setElementActive({
                              element: {
                                ...elementActive.element,
                                category: e.target.value,
                              },
                            })
                          );
                        }
                      }}
                    />
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <Field
                      as={TextField}
                      id="outlined-description"
                      label={translatedPlaceholder.description}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      name="description"
                      value={formDetails.initialValues.description}
                      onChange={(e) => {
                        setFieldValue("description", e.target.value);
                        if (elementActive) {
                          dispatch(
                            setElementActive({
                              element: {
                                ...elementActive.element,
                                description: e.target.value,
                              },
                            })
                          );
                        }
                      }}
                    />
                    <Field
                      as={TextField}
                      id="outlined-stock"
                      label={translatedPlaceholder.stock}
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                      name="stock"
                      value={formDetails.initialValues.stock}
                      type="number"
                      onChange={(e) => {
                        setFieldValue("stock", parseFloat(e.target.value));
                        if (elementActive) {
                          dispatch(
                            setElementActive({
                              element: {
                                ...elementActive.element,
                                stock: parseFloat(e.target.value),
                              },
                            })
                          );
                        }
                      }}
                    />
                  </>
                )}
                {activeStep === 2 && (
                  <Field
                    as={TextField}
                    id="outlined-image"
                    label={translatedPlaceholder.image}
                    variant="outlined"
                    fullWidth
                    name="image"
                    value={formDetails.initialValues.image}
                    onChange={(e) => {
                      setFieldValue("image", e.target.value);
                      if (elementActive) {
                        dispatch(
                          setElementActive({
                            element: {
                              ...elementActive.element,
                              image: e.target.value,
                            },
                          })
                        );
                      }
                    }}
                  />
                )}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Atrás
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button type="submit" onClick={handleNext}>
                    {activeStep === steps.length - 1
                      ? "Finalizar"
                      : "Siguiente"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};
