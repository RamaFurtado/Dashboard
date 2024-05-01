import { Box } from '@mui/material';
import Sidebar from './components/ui/sidebar/Sidebar.tsx';


function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar /> {}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {}
      </Box>
    </Box>
  );
}
export default App