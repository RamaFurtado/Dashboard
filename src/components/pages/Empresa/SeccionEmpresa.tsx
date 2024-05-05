interface ISeccionEmpresa {
    setSection: (state: string) => void;

}

export const SeccionEmpresa = ({ setSection }: ISeccionEmpresa) => {


    return (
        <div>
            <h2>Seccion de Empresa</h2>
        </div>
    )
}