

import * as Yup from "yup";
import { GenericModal } from "../GenericModal";
import { IEmpresa } from "../../../../types/IEmpresa";
import { useAppSelector } from "../../../../hooks/redux";

interface IModalEmpresa {
    getEmpresa: () => void; // Función para obtener las empresas
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}

export const ModalEmpresa = ({ getEmpresa, openModal, setOpenModal }: IModalEmpresa) => {

    const elementActive = useAppSelector(
        (state) => state.tableReducer.elementActive
    );

    // Necesario para el modal genérico con insumos
    const initialValues: IEmpresa = elementActive?.element || {
        id: 0,
        name: '',
        description: '',
        cuil: 0,
        image: '',
        actions: '',
        active: true,
    };

    //validación del formulario específico para insumos
    const validationSchema = Yup.object({
        name: Yup.string().required('Campo requerido'),
        description: Yup.string().required('Campo requerido'),
        cuil: Yup.number().required('Campo requerido'),
        image: Yup.string().required('Campo requerido'),
    }) as Yup.ObjectSchema<object>;

    // Traducción de los placeholders del formulario de insumos
    const translatedPlaceholder = {
        name: 'Nombre',
        description: 'Descripción',
        cuil: 'cuil',
        image: 'Imagen',
    }

    // Englobamos todas las props referidas al formulario que vamos a pasarle al Modal genérico
    const formDetails = {
        validationSchema: validationSchema,
        initialValues: initialValues,
        translatedPlaceholder: translatedPlaceholder,
        formInputType: {
            name: 'text',
            description: 'text',
            cuil: 'number',
            image: 'text',
        },
    }
    return (
        <GenericModal<IEmpresa>
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalTitle="Empresas"
            formDetails={formDetails}
            route="empresa"
            getItems={getEmpresa}/>
    )
}
