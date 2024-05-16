

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
        nombre: '',
        razonSocial: '',
        cuil: 0,
        actions: '',
        eliminado: true,
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
        nombre: 'Nombre',
        razonSocial: 'Razon Social',
        cuil: 'Cuil',
    }

    // Englobamos todas las props referidas al formulario que vamos a pasarle al Modal genérico
    const formDetails = {
        validationSchema: validationSchema,
        initialValues: initialValues,
        translatedPlaceholder: translatedPlaceholder,
        formInputType: {
            nombre: 'text',
            razonSocial: 'text',
            cuil: 'number',
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
