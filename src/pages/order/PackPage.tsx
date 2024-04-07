import { Button, Card, Form, Input, Layout } from "antd";
import Table from "../../component/table";
import { InboxOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function PackPage() {
  const navigate = useNavigate();
  const [recordItem, setRecordItem] = useState([]);

  useEffect(() => {
    getRecordItem();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "id", //แสดงเลขตามลำดับ
    },
    {
      title: "SKU",
      dataIndex: "item",
      render: (value: any, record: any) => {
        return <p>{value?.sku}</p>;
      },
    },
    {
      title: "ร้านค้า",
      dataIndex: "item",
      render: (value: any, record: any) => {
        return <p>{value?.stores.name}</p>;
      },
    },
    {
      title: "จำนวน",
      dataIndex: "quantity",
    },
    {
      title: "คงเหลือ",
      dataIndex: "item",
      render: (value: any, record: any) => {
        return <p>{value?.quantity}</p>;
      },
    },
  ];

  const getRecordItem = async () => {
    try {
      const res = await axios.get("http://192.168.2.57:3000/records/item");
      setRecordItem(res.data.data);
      console.log(res);
    } catch (error: any) {
      alert(error?.response?.data.message);
    }
  };

  return (
    <Layout className=" bg-[#EDEDED]">
      <Card
        title={
          <span>
            <InboxOutlined className=" text-3xl font-bold mr-3" />
            แพ็คสินค้า
          </span>
        }
        className=" m-[70px]"
        
      >
        {/* กลุ่ม Form Filter */}

        <Form className=" m-5 text-center">
          <Form.Item label="รหัสสินค้า">
            <Input className=" rounded-3xl w-[250px]" />
          </Form.Item>
          <Form.Item label="ร้านค้า">
            <Input className=" rounded-3xl w-[250px]" />
          </Form.Item>
          <Form.Item>
            <Button style={{backgroundColor:'#2F353A', color:'white'}} icon={<SearchOutlined />}>
              ค้นหา
            </Button>
          </Form.Item>
        </Form>

        {/* กลุ่ม Form Filter */}
        <Table
          data={recordItem}
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
          key={"id"}
        />
      </Card>
    </Layout>
  );
}
export default PackPage;
