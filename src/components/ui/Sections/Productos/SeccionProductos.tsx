interface ISeccionProductos {
    setSection: (state: string) => void;

}

export const SeccionProductos = ({ setSection }: ISeccionProductos) => {


    return (
        <div>
            <h2>Seccion de Productos</h2>
        </div>
    )
}