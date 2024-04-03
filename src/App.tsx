import { BrowserRouter, Routes, Route } from "react-router-dom";
import Full from "./nevigation/Nav.tsx";
import Warehouse from "./pages/Warehouse.tsx";
import Item from "./pages/Item.tsx";
import StoreU from "./pages/Store.tsx";
import Order from "./pages/order/Order1.tsx";
import Order2 from "./pages/order/Order2.tsx";
import Order3 from "./pages/order/Order3.tsx";
import Order4 from "./pages/order/Order4.tsx";
import Order5 from "./pages/order/Order5.tsx";
import Order6 from "./pages/order/Order6.tsx";
import Order7 from "./pages/order/Order7.tsx";
import Table from "./component/index.tsx";

function Fullfill() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Full />}>
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/item" element={<Item />} />
          <Route path="/store" element={<StoreU />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order2" element={<Order2 />} />
          <Route path="/order3" element={<Order3 />} />
          <Route path="/order4" element={<Order4 />} />
          <Route path="/order5" element={<Order5 />} />
          <Route path="/order6" element={<Order6 />} />
          <Route path="/order7" element={<Order7 />} />
          <Route path="/table" element={<Table />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Fullfill;
