import { BrowserRouter, Routes, Route } from "react-router-dom";
import Full from "./nevigation/Nav.tsx";
import Warehouse from "./pages/Warehouse.tsx";
import Item from "./pages/Item.tsx";
import StoreU from "./pages/๊User/Store.tsx";
import SOLPage from "./pages/order/SOLPage.tsx";
import PackPage from "./pages/order/PackPage.tsx";
import Uncheck from "./pages/order/Uncheck.tsx";
import ProgressPage from "./pages/order/ProgressPage.tsx";
import OutPage from "./pages/order/OutPage.tsx";
import FinishPage from "./pages/order/FinishPage.tsx";
import ReturnPage from "./pages/order/ReturnPage.tsx";
import AddOrderPage from "./pages/FormOrder/AddOrderPage.tsx";
import UpdateOrderPage from "./pages/FormOrder/UpdateOrderPage.tsx";
import DetailsOrder from "./pages/FormOrder/DetailsOrderPage.tsx";
import OrderHistory from "./pages/FormOrder/OrderHistory.tsx";
import Admin from "./pages/๊User/Admin.tsx";
import Location from "./pages/Location.tsx";
import Login from "./pages/Login.tsx";

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
          <Route path="/AddOrderPage" element={<AddOrderPage />} />
          <Route path="/UpdateOrderPage" element={<UpdateOrderPage />} />
          <Route path="/DetailsOrderPage" element={<DetailsOrder />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Location" element={<Location />} />
          <Route path="/Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Fullfill;
