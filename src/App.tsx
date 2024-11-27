import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import SurveyPage from './pages/SurveyPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/survey/*' element={<SurveyPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
