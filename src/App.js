import './App.css';
import Login from './components/login/login.js';
import Navbar from './components/navbar';
import BasicDetails from './components/basicDetails/basicDetails.js';
import CourseDetails from './components/courseDetails/courseDetails.js';
import RelocationDetail from './components/relocationDetails/relocationDetails.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonalDetails from './components/personalDetails/personalDetails';
import AddressDetails from './components/addressDetails/addressDetails';
import DeclarationDetail from './components/declarationDetail/declarationDetail'
import Success from './components/successPage/successPage';
import Footer from './components/footer';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = { <Login /> } />
          <Route path = '/basicDetails' element = { <BasicDetails /> } />
          <Route path = '/courseDetails' element = { <CourseDetails /> } />
          <Route path = '/relocationDetails' element = { <RelocationDetail /> } />
          <Route path = '/personalDetails' element = { <PersonalDetails /> } />
          <Route path = '/addressDetails' element = { <AddressDetails/> } />
          <Route path = '/declarationDetail' element = { <DeclarationDetail/> } />
          <Route path = '/success' element = { <Success /> } />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
