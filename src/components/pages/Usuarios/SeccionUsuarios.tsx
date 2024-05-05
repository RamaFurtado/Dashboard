interface ISeccionUsuarios {
    setSection: (state: string) => void;

}

export const SeccionUsuarios = ({ setSection }: ISeccionUsuarios) => {


    return (
        <div>
            <h2>Seccion de Usuarios</h2>
        </div>
    )
}