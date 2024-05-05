import { Button, Table } from "react-bootstrap";
import styles from "./GenericTable.module.css";

export const TableComponent = ({ headerData, tableData }: any) => {
  const propertyNames = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  return (
    <div className={styles.containerTablePrincipal}>
      <div className={styles.containerTable}>
        <Table bordered striped hover style={{ cursor: "pointer" }}>
          <thead className={styles.tHeadStyle}>
            <tr>
              {headerData.map((el: any) => (
                <th key={el.label}>{el.label}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((el: any) => (
              <tr className={styles.tableItem} key={el.nombre}>
                {propertyNames.map((propertyName: string) => (
                  <td key={propertyName}>{el[propertyName]}</td>
                ))}
                <td className={styles.actions}>
                  <Button className="material-symbols-outlined">Editar</Button>
                  <Button className="material-symbols-outlined">Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
