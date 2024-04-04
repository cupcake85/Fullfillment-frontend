import { Button, Card, Layout } from "antd";
import Table from "../../component/table";
import { InboxOutlined } from "@ant-design/icons";
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
      dataIndex: "id",
    },
    {
      title: "SKU",
      dataIndex: "item",
      render: (value: any, record: any) => {
        return <p>{record.details}</p>
      }
    },
    {
      title: "ร้านค้า",
      dataIndex: "stores",
      render: (value: any, record: any) => {
        return <p>{value?.name}</p>
      }
    },
    {
      title: "จำนวน",
      dataIndex: "quantity",
    },
    {
      title: "คงเหลือ",
      dataIndex: "item",
      render: (value: any, record: any) => {
        return <p>{value?.quantity}</p>
      }
    },
  ];

  const getRecordItem = async () => {
    try {
      const res = await axios.get("http://192.168.2.57:3000/record/item");
      setRecordItem(res.data.data);
      console.log('recordItem axios -> ',res);
    } catch (error: any) {
      alert(error?.response?.data.message);
    }
  };

  return (
    <Layout className=" bg-cyan-200">
      <Card
        title={
          <span>
            <InboxOutlined className=" text-3xl font-bold mr-3" />
            แพ็คสินค้า
          </span>
        }
        className=" m-[70px]"
      >
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
          total={0} key={""}       
        />
      </Card>
    </Layout>
  );
}
export default PackPage;
