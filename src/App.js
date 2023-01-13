

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Analytics from './pages/analytics';
import Home from './pages/home';


//main app component
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
