interface ISeccionPromociones {
    setSection: (state: string) => void;

}

export const SeccionPromociones = ({ setSection }: ISeccionPromociones) => {


    return (
        <div>
            <h2>Seccion de Promociones</h2>
        </div>
    )
}