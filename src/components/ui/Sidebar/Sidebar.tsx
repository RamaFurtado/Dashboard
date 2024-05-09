import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DomainIcon from "@mui/icons-material/Domain";
import GroupIcon from "@mui/icons-material/Group";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setCurrentSection } from "../../../redux/slices/SectionReducer";
import { SeccionInicio } from "../../pages/Inicio/SeccionInicio";
import { SeccionProductos } from "../../pages/Productos/SeccionProductos";
import { SeccionCategorias } from "../../pages/Categorias/SeccionCategorias";
import { SeccionPromociones } from "../../pages/Promociones/SeccionPromociones";
import { SeccionEmpresa } from "../../pages/Empresa/SeccionEmpresa";
import { SeccionUsuarios } from "../../pages/Usuarios/SeccionUsuarios";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
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
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// ----------------------------------------------CODIGO POR NOSOTROS------------------------------------------------

interface IDashboardItem {
  text: string;
  icon: JSX.Element;
  subcategory?: IDashboardItem[];
}

interface IDashboard {
  list: IDashboardItem[];
}

const subcategorias = [
  {
    text: "Hamburguesas",
    icon: <ShoppingBagIcon />,
  },
  {
    text: "Pizzas",
    icon: <ShoppingBagIcon />,
  },
  {
    text: "Lomos",
    icon: <ShoppingBagIcon />,
  },
  {
    text: "Bebidas",
    icon: <ShoppingBagIcon />,
  },
];
const dashboardItems: IDashboard = {
  list: [
    {
      text: "Inicio",
      icon: <DashboardIcon />,
    },
    {
      text: "Productos",
      icon: <ShoppingBagIcon />,
    },
    {
      text: "Categorías",
      icon: <CategoryIcon />,
      subcategory: subcategorias,
    },
    {
      text: "Promociones",
      icon: <LocalOfferIcon />,
    },
    {
      text: "Empresa",
      icon: <DomainIcon />,
    },
    {
      text: "Usuarios",
      icon: <GroupIcon />,
    },
  ],
};

//-------------------------------------------------------------------------------------------------------------

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openNested, setOpenNested] = React.useState(false);

  // --------------------------------- CARGAR ESTADO 'SECTION' -------------------------------
  const currentSection: string = useAppSelector(
    (state) => state.sectionReducer.sectionActual
  );
  const dispatch = useAppDispatch();

  const [section, setSection] = React.useState<string>("Inicio");

  //Actualiza el estado de redux de 'currentSection' al cambiar de sección
  React.useEffect(() => {
    setSection(currentSection);
  }, [currentSection]);

  const handleSectionChange = (newSection: string) => {
    setSection(newSection);
    dispatch(setCurrentSection(newSection));
  };

  // renderiza componentes en función del estado actual
  const dashboardSection = (seccionActual: string) => {
    switch (seccionActual) {
      case "Inicio":
        return <SeccionInicio setSection={setSection} />;
      case "Productos":
        return <SeccionProductos />;
      case "Categorías":
        return <SeccionCategorias />;
      case "Promociones":
        return <SeccionPromociones />;
      case "Empresa":
        return <SeccionEmpresa />;
      case "Usuarios":
        return <SeccionUsuarios />;
    }
  };
  // -----------------------------------------------------

  const handleDrawerOpen = () => {
    setOpen(true);
  };


  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar style={{ zIndex: 1000 }} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        style={{ zIndex: 100 }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* recorre y renderiza la lista de secciones */}
          {dashboardItems.list.map(({ text, icon }, index) => (
            <div key={index}>
              <ListItem
                onClick={() => { handleSectionChange(text) }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </div>
          ))}
        </List>
      </Drawer>
      <Main style={{ marginTop: "36px" }} open={open}>
        {dashboardSection(section)}
      </Main>
    </Box>
  );
}
