import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UpdateForm from './components/UpdateForm';
function App() {
  return (
    <div className="App">
      <Router>
        <div className="container mt-5">

          <Routes>
            <Route path="/add-employee" element={<EmployeeForm />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/edit-employee/:id" element={<UpdateForm />} />
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
