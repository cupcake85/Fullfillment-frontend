import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Full from "../src/nevigation/Nev.tsx";
import Warehouse from './nevigation/Warehouse.tsx'
import Item from './nevigation/Item.tsx'

function Fullfill() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Full />}>
          <Route path="/Warehouse" element={<Warehouse />} />
          <Route path="/Item" element={<Item />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Fullfill;
