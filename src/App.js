// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Visualizer from './components/Visualizer/Visualizer';
import About from './components/About';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Visualizer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
