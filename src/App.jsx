import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Write from "./components/Write.jsx";
import Read from "./components/Read.jsx";
import UpdateRead from "./components/UpdateRead.jsx";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Write />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update" element={<UpdateRead />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
