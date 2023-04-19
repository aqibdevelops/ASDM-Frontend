import './App.css';
import Login from './components/login/login.js';
import Navbar from './components/navbar';
import BasicDetails from './components/basicDetails/basicDetails.js';
import CourseDetails from './components/courseDetails/courseDetails.js';
import RelocationDetail from './components/relocationDetails/relocationDetails.js';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Login /> */}
      <BasicDetails />
      {/* <CourseDetails /> */}
      {/* <RelocationDetail /> */}
    </div>
  );
}

export default App;
