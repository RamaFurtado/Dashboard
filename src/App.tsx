import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from '@mui/material';
import PersistentDrawerLeft from './components/ui/Sidebar/Sidebar.tsx';


function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <PersistentDrawerLeft /> { }
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        { }
      </Box>
    </Box>
  );
}
export default App