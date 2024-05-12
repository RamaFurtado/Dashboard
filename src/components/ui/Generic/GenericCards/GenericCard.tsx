import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

interface IGenericAtribute<T> {
    label: string
    key: string
    render?: (item: T) => ReactNode;
}
export interface ICardProps<T> {
    field: IGenericAtribute<T>[];
    handleDelete: (id: number) => void;
    setOpenModal: (state: boolean) => void;
}

export const GenericCard = <T extends { id: number }>({
    field,
    handleDelete,
    setOpenModal,
}: ICardProps<T>) => {

    const dataCard = useAppSelector((state) => state.tableReducer.dataTable);

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    return (
        <>
            {dataCard.map((item) => {
                return (
                    <Card sx={{ minWidth: 275 }}>
                        {field.map((field) => (
                            <CardContent>
                                {field.key === "name" && (
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {field.label}
                                    </Typography>
                                )}
                                {field.key === "image" && (
                                    <img src={item[field.key]} alt={item.name} />
                                )}
                                {field.key === "description" || field.key === "address" && (
                                    <Typography variant="body2">
                                    {field.label}
                                </Typography>
                                )}
                            </CardContent>
                        ))}
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </>
    )
}