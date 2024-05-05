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

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Collapse from "@mui/material/Collapse";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DomainIcon from "@mui/icons-material/Domain";
import GroupIcon from "@mui/icons-material/Group";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setCurrentSection } from "../../../redux/slices/SectionReducer";
import { SeccionInicio } from "../../ui/Sections/Inicio/SeccionInicio";
import { SeccionProductos } from "../../ui/Sections/Productos/SeccionProductos";
import { SeccionCategorias } from "../../ui/Sections/Categorias/SeccionCategorias";
import { SeccionPromociones } from "../../ui/Sections/Promociones/SeccionPromociones";
import { SeccionEmpresa } from "../../ui/Sections/Empresa/SeccionEmpresa";
import { SeccionUsuarios } from "../../ui/Sections/Usuarios/SeccionUsuarios";

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

  React.useEffect(() => {
    setSection(currentSection);
  }, [currentSection]);

  const handleSectionChange = (newSection: string) => {
    setSection(newSection);
    dispatch(setCurrentSection(newSection));
  };

  const dashboardSection = (seccionActual: string) => {
    switch (seccionActual) {
      case "Inicio":
        // return <h2>Inicio</h2>;
        return <SeccionInicio setSection={setSection} />;
      case "Productos":
        // return <h2>productos</h2>;
      return <SeccionProductos />
      case "Categorías":
        // return <h2>categorias</h2>;
      return <SeccionCategorias />
      case "Promociones":
        // return <h2>promociones</h2>;
      return <SeccionPromociones />
      case "Empresa":
        // return <h2>empresa</h2>;
      return <SeccionEmpresa />
      case "Usuarios":
        // return <h2>Usuarios</h2>;
      return <SeccionUsuarios />
    }
  };
  // -----------------------------------------------------

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleNestedOpen = () => {
    setOpenNested(!openNested);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
          {dashboardItems.list.map(({ text, icon, subcategory }) => (
            <div key={text}>
              <ListItem
                onClick={() => handleSectionChange(text)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                  {subcategory && subcategory?.length > 0 ? (
                    openNested ? (
                      <ExpandLess onClick={handleNestedOpen} />
                    ) : (
                      <ExpandMore onClick={handleNestedOpen} />
                    )
                  ) : null}
                </ListItemButton>
              </ListItem>
              {subcategory && subcategory.length > 0 && (
                <Collapse in={openNested} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subcategory.map(({ text: subText, icon: subIcon }) => (
                      <ListItemButton key={subText} sx={{ pl: 4 }}>
                        <ListItemIcon>{subIcon}</ListItemIcon>
                        <ListItemText primary={subText} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
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
