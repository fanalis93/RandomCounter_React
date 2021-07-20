import logo from './logo.svg';
import './App.css';
import AppRouter from './router';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
