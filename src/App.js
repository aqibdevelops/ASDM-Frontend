import './App.css';
import Login from './components/login/login.js';
import Navbar from './components/navbar';
import BasicDetails from './components/basicDetails/basicDetails.js';
import CourseDetails from './components/courseDetails/courseDetails.js';
import RelocationDetail from './components/relocationDetails/relocationDetails.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = { <Login /> } />
          <Route path = '/basicDetails' element = { <BasicDetails /> } />
          <Route path = '/courseDetails' element = { <CourseDetails /> } />
          <Route path = '/relocationDetails' element = { <RelocationDetail /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
