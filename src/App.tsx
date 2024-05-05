import { Box } from '@mui/material';
import PersistentDrawerLeft from './components/pages/Sidebar/Sidebar.tsx';


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