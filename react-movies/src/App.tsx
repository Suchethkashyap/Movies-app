import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './utils/Menu';
import routes from './route-config';
import configureValidations from './Validations';
import Footer from './utils/Footer';

configureValidations();

function App() {
 



  return (
    <BrowserRouter>
      <Menu />
      <div  className="container">
        <Routes>
        {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
