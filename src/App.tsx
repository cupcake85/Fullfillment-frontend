import { BrowserRouter, Routes, Route } from "react-router-dom";
import Full from "./nevigation/Nav.tsx";
import Warehouse from "./pages/Warehouse.tsx";
import Item from "./pages/Item.tsx";
import StoreU from "./pages/Store.tsx";
import SOLPage from "./pages/order/SOLPage.tsx";
import PackPage from "./pages/order/PackPage.tsx";
import Uncheck from "./pages/order/Uncheck.tsx";
import ProgressPage from "./pages/order/ProgressPage.tsx";
import OutPage from "./pages/order/OutPage.tsx";
import FinishPage from "./pages/order/FinishPage.tsx";
import ReturnPage from "./pages/order/ReturnPage.tsx";
import Table from "./component/index.tsx";
import AddOrderPage from "./pages/FormOrder/AddOrderPage.tsx";
import EditPage from './component/OrderAction/EditPage.tsx';

function Fullfill() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Full />}>
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/item" element={<Item />} />
          <Route path="/store" element={<StoreU />} />
          <Route path="/SOLPage" element={<SOLPage />} />
          <Route path="/PackPage" element={<PackPage />} />
          <Route path="/Uncheck" element={<Uncheck />} />
          <Route path="/ProgressPage" element={<ProgressPage />} />
          <Route path="/OutPage" element={<OutPage />} />
          <Route path="/FinishPage" element={<FinishPage />} />
          <Route path="/ReturnPage" element={<ReturnPage />} />
          <Route path="/table" element={<Table />} />
          <Route path="/AddOrderPage" element={<AddOrderPage />} />
          <Route path="/EditPage" element={<EditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Fullfill;
