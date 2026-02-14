import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TeamEntryPage from './pages/TeamEntryPage';
import TreasureCodePage from './pages/TreasureCodePage';
import StartPage from './pages/StartPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/treasure" replace />} />
        <Route path="/treasure" element={<TeamEntryPage />} />
        <Route path="/treasure/start" element={<StartPage />} />
        <Route path="/treasure/:code" element={<TreasureCodePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
