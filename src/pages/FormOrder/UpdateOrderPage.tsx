import { Card, Layout } from "antd";
import UpdateOrder from "../../component/UpdateOrder";

const UpdateOrderPage= () => {
  return (
    <Layout>
      <Card className=" m-[70px]" title="แก้ไขรายการ order">
        <UpdateOrder />
      </Card>
    </Layout>
  );
};

export default UpdateOrderPage;
