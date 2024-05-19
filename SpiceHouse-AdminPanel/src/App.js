import AppFoodData from './components/AppFoodData';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import OrderSection from './components/Orders/OrderSection';
import ShowOrderSpecific from './components/Orders/ShowOrderSpecific';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<OrderSection/>} />
         <Route path="/orders" element={<OrderSection/>}/>
         <Route path="/addfood" element={<AppFoodData/>}/>
        <Route path="/orderdetails/:orderid" element={<ShowOrderSpecific/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
