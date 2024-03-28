
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Full from "../src/nevigation/Nev.tsx";
import Warehouse from './nevigation/Warehouse.tsx'
import Item from './nevigation/Item.tsx'
import StoreU from './nevigation/Store.tsx'

function Fullfill() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Full />}>
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/item" element={<Item />} />
          <Route path="/store" element={<StoreU />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Fullfill;
