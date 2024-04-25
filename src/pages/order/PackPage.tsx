import { Button, Card, DatePicker, Form, Input, Layout, Table } from "antd";
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
      render: (_: any, __: any, index: number) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "SKU",
      dataIndex: "item",
      render: (value: any, record: any) => {
        return <p>{value?.sku}</p>;
      },
      align: "center",
    },
    {
      title: "ร้านค้า",
      dataIndex: "item",
      render: (value: any, record: any) => {
        return <p>{value?.stores.name}</p>;
      },
      align: "center",
    },
    {
      title: "จำนวน",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "คงเหลือ",
      dataIndex: "item",
      render: (value: any, record: any) => {
        return <p>{value?.quantity}</p>;
      },
      align: "center",
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
          <span
            style={{
              display: "flex",
              alignContent: "baseline",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <InboxOutlined
              style={{
                marginRight: "20px",
                fontSize: "50px",
                marginLeft: "20px",
              }}
            />
            แพ็คสินค้า
          </span>
        }
        style={{
          backgroundColor: "white",
          margin: 65,
          borderRadius: 20,
          marginTop: "40px",
        }}
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
          dataSource={recordItem}
          columns={columns}
          key={"id"}
          pagination={{
            total: recordItem.length,
            showSizeChanger: true,
          }}
        />
      </Card>
    </Layout>
  );
}
export default PackPage;
