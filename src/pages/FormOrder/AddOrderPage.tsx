import { Card, Layout } from "antd";
import OrderForm from "../../component/OrderForm";

const AddOrderPage= () => {
  return (
    <Layout>
      <Card className=" m-[70px]" title="เพิ่มรายการ order">
        <OrderForm />
      </Card>
    </Layout>
  );
};

export default AddOrderPage;
