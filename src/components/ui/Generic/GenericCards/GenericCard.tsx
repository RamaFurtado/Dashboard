import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface IGenericAtribute<T> {
  label: string;
  key: string;
  render?: (item: T) => ReactNode;
}
export interface ICardProps<T> {
  handleClick: (id: number) => void;
  handleDelete: (id: number) => void;
  setOpenModal: (state: boolean) => void;
}

export const GenericCards = <T extends { id: number }>({
  handleClick,
  handleDelete,
  setOpenModal,
}: ICardProps<T>) => {
  const dataCard = useAppSelector((state) => state.tableReducer.dataTable);

  return (
    <>
      {dataCard.map((item) => {
        console.log(item);
        return (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {item.name}
              </Typography>
              {/* <img src={item[item.key]} alt={item.name} /> */}
              <p>Imagen</p>
              {item.description && (
                <Typography variant="body2">{item.description}</Typography>
              )}
              {item.address && (
                <Typography variant="body2">{item.address}</Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleClick(item.id)}>Ver mas</Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};
