import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Page1 />} />
          <Route path="/album" element={<Page2 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;