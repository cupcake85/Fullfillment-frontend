import { Button, Card, Layout } from "antd";
import Table from "../../component/table";
import { InboxOutlined } from "@ant-design/icons";
import OrderForm from "../../component/OrderForm";
import { useNavigate } from "react-router-dom";

function PackPage() {

    const navigate = useNavigate();

  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "ร้านค้า",
      dataIndex: "age",
    },
    {
      title: "รายละเอียด",
      dataIndex: "email",
    },
    {
      title: "จำนวน",
      dataIndex: "email",
    },
    {
      title: "คงเหลือ",
      dataIndex: "email",
    },
  ];

  return (
    
    <Layout className=" bg-cyan-200">

 <Button className=" bg-teal-600" onClick={() => navigate('/AddOrderPage')}>เพิ่มรายการสั่งของ</Button>

      <Card title={
        <span>
            <InboxOutlined className=" text-3xl font-bold mr-3"/>
            แพ็คสินค้า
        </span>
      }
      className=" m-[70px]">

       

        <Table
          data={[]}
          columns={columns}
          pagination={{
            current: 0,
            setCurrent: function (value: number): void {
              throw new Error("Function not implemented.");
            },
          }}
          pageSize={{
            pageSize: 0,
            setPageSize: function (value: number): void {
              throw new Error("Function not implemented.");
            },
          }}
          total={0}
        />
      </Card>
    </Layout>
  );
}
export default PackPage;
