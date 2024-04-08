import { Button, Card, DatePicker, Form, Input, Layout } from "antd";
import Table from "../../component/table";
import { InboxOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function PackPage() {
  const navigate = useNavigate();
  const [recordItem, setRecordItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState<Record<string, unknown>>();

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
      const res = await axios.get("http://192.168.2.57:3000/records/item", {
        params: { ...searchQuery },
      });
      setRecordItem(res.data.data);
      console.log(res);
    } catch (error: any) {
      alert(error?.response?.data.message);
    }
  };

  const onClickSearch = () => {
    getRecordItem();
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

        <div className="flex items-baseline">
          <div className="flex items-baseline">
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              รหัสสินค้า
            </div>
            <Form.Item>
              <Input
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    sku: e.target.value,
                  })
                }
                style={{
                  width: "250px",
                  borderRadius: "25px",
                  marginBottom: "15px",
                  height: "35px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  border: "solid 1px",
                }}
                placeholder="รหัสสินค้า"
              />
            </Form.Item>
          </div>
          <div className="flex items-baseline">
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>ร้านค้า</div>
            <Form.Item>
              <Input
                style={{
                  width: "250px",
                  borderRadius: "25px",
                  marginBottom: "15px",
                  height: "35px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  border: "solid 1px",
                }}
                placeholder="ร้านค้า"
              />
            </Form.Item>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="flex items-baseline">
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>ระยะเวลา</div>
            <Form.Item>
              <DatePicker
                style={{
                  width: "200px",
                  borderRadius: "20px",
                  marginBottom: "15px",
                  height: "35px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  border: "solid 1px",
                }}
              />
              <DatePicker
                style={{
                  width: "200px",
                  borderRadius: "20px",
                  marginBottom: "15px",
                  height: "35px",
                  marginRight: "15px",
                  border: "solid 1px",
                }}
              />
              <Button
                onClick={onClickSearch}
                style={{
                  backgroundColor: "#2F353A",
                  borderRadius: "25px",
                  marginBottom: "15px",
                  height: "40px",
                  width: "40px",

                  color: "#fff",
                }}
                icon={<SearchOutlined />}
              ></Button>
            </Form.Item>
          </div>
        </div>

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
