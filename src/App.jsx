import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Write from "./components/Write";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Write />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
