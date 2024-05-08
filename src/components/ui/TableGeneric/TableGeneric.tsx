import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Table } from "react-bootstrap";
import { ButtonsTable } from "../ButtonsTable/ButtonsTable";

interface ITableColumn<T> {
  label: string;
  key?: string;
  render?: (item: T) => ReactNode;
}
export interface ITableProps<T> {
  columns: ITableColumn<T>[];
  handleDelete: (id: number) => void;
  setOpenModal: (state: boolean) => void;
}

export const TableGeneric = <T extends { id: any }>({
  columns,
  handleDelete,
  setOpenModal,
}: ITableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //Cambiar de pagina desde donde estoy parado
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  //Se usa el + antes del event para convertirlo en un numero ya que vienen del input como string
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [rows, setRows] = useState<any[]>([]);

  //Obtener los datos de la tabla en su estado inicial (sin datos)
  const dataTable = useAppSelector((state) => state.tableReducer.dataTable);

  //useEffect va a estar escuchando el estado 'dataTable' para actualizar los datos de las filas con los datos de la tabla
  useEffect(() => {
    setRows(dataTable);
  }, [dataTable]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "90%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, i: number) => (
                  <TableCell key={i} align={"center"}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index: number) => {
                  return (
                    <TableRow>
                      {columns.map((column, i: number) => {
                        return (
                          <TableCell key={i} align={"center"}>
                            {column.render ? (
                              column.render(row)
                            ) : column.label === "Acciones" ? (
                              <ButtonsTable
                                el={row}
                                handleDelete={handleDelete}
                                setOpenModal={setOpenModal}
                              />
                            ) : (
                              row[column.key]
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TableGeneric;
