import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from '@mui/material';
import PersistentDrawerLeft from './components/ui/Sidebar/Sidebar.tsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/Login/Login.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <Box sx={{ display: 'flex' }}>
              <PersistentDrawerLeft />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* Aquí iría el contenido principal */}
              </Box>
            </Box>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;