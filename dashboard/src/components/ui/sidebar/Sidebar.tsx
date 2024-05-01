import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoAwesomeMosaicSharpIcon from '@mui/icons-material/AutoAwesomeMosaicSharp';
import BusinessSharpIcon from '@mui/icons-material/BusinessSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import RestaurantSharpIcon from '@mui/icons-material/RestaurantSharp';
import ReceiptSharpIcon from '@mui/icons-material/ReceiptSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import LocalOfferSharpIcon from '@mui/icons-material/LocalOfferSharp';
import QueryStatsSharpIcon from '@mui/icons-material/QueryStatsSharp';

const iconMap={
  'Panel': <AutoAwesomeMosaicSharpIcon />,
  'Empresa': <BusinessSharpIcon />,
  'Sucursales': <StoreSharpIcon />,
  'Productos': <RestaurantSharpIcon />,
  'Categorias': <ReceiptSharpIcon />,
  'Usuarios': <PeopleAltSharpIcon />,
  'Promociones': <LocalOfferSharpIcon />,
  'Reportes': <QueryStatsSharpIcon />
};
export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const list = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {['Panel', 'Empresa', 'Sucursales', 'Productos', 'Categorias', 'Usuarios', 'Promociones', 'Reportes'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{iconMap[text]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
      <Button onClick={toggleDrawer(true)}>Dashboard</Button>
    </div>
  );
}