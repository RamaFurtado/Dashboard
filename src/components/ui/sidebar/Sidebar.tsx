import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DomainIcon from '@mui/icons-material/Domain';
import GroupIcon from '@mui/icons-material/Group';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setCurrentSection } from '../../../redux/slices/SectionReducer';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// ----------------------------------------------CODIGO POR NOSOTROS------------------------------------------------



const dashboardSection = (seccionActual: string) => {

  switch (seccionActual) {
    case 'Inicio':
      return <h2>inicio</h2>
    // return <SeccionInicio />
    case 'Productos':
      return <h2>productos</h2>
    // return <SeccionProductos />
    case 'Categorias':
      return <h2>categorias</h2>
    // return <SeccionCategorias />
    case 'Promociones':
      return <h2>promociones</h2>
    // return <SeccionPromociones />
    case 'Empresa':
      return <h2>empresa</h2>
    // return <SeccionEmpresa />
    case 'Usuarios':
      return <h2>Usuarios</h2>
    // return <SeccionUsuarios />
  }
}


interface IDashboardItem {
  text: string,
  icon: JSX.Element,
}

interface IDashboard {
  list: IDashboardItem[]
}

const dashboardItems: IDashboard = {
  list: [
    {
      text: 'Inicio',
      icon: <DashboardIcon />
    },
    {
      text: 'Productos',
      icon: <ShoppingBagIcon />
    },
    {
      text: 'Categorías',
      icon: <CategoryIcon />
    },
    {
      text: 'Promociones',
      icon: <LocalOfferIcon />
    },
    {
      text: 'Empresa',
      icon: <DomainIcon />
    },
    {
      text: 'Usuarios',
      icon: <GroupIcon />
    }
  ]
}

//-------------------------------------------------------------------------------------------------------------

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const currentSection: string = useAppSelector((state) => state.sectionReducer.sectionActual);
  const dispatch = useAppDispatch();

  const [section, setSection] = React.useState<string>(currentSection);

  React.useEffect(() => {
    setSection(currentSection)
  }, [currentSection])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSectionChange = (newSection: string) => {
    setSection(newSection)
    dispatch(setCurrentSection(newSection));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {dashboardItems.list.map(({ text, icon }) => (
            <ListItem onClick={() => { handleSectionChange(text); console.log(text); }} key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        {dashboardSection(section)}
      </Main>
    </Box>
  );
}