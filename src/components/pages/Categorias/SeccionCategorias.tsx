interface ISeccionCategorias {
    setSection: (state: string) => void;

}

export const SeccionCategorias = ({ setSection }: ISeccionCategorias) => {


    return (
        <div>
            <h2>Seccion de Categorias</h2>
        </div>
    )
}