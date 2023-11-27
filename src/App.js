import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OtpPage from './practices/OtpPage.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<OtpPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
