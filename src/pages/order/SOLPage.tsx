import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Space,
  TableColumnsType,
  TableProps,
} from "antd";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import CustomTable from "../../component/table";
import axios from "axios";
import { useNavigate } from "react-router";
import form from "antd/es/form";

function Order() {
  const [orderData, setOrderData] = useState([]);
  const [getStores, setStores] = useState();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    getStore();
  }, []);

  const onClick = (value?: any) => {
    console.log(value);

    // if (value) {
    //   const orderFormData = value;
    //   form.setFieldsValue(orderFormData);
    // }
    navigate("/UpdateOrderPage", {
      state: {
        id: value.id,
      },
    });
  };

  const getOrder = async () => {
    const request = await axios.get("http://192.168.2.57:3000/orders");
    const sortedData = request.data.data;
    setOrderData(sortedData);
  };

  const getStore = async () => {
    const request = await axios.get("http://192.168.2.57:3000/stores");
    const sortedData = request.data.data.map((data: any) => {
      return { label: data.name, value: data.id };
    });

    setStores(sortedData);
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "รายละเอียด", dataIndex: "" },
    { title: "วันที่", dataIndex: "orderDate" },
    {
      title: "ที่อยู่",
      dataIndex: "address",
    },
    {
      title: "รหัสไปรษณี",
      dataIndex: "zipCode",
    },
    {
      title: "เก็บเงินปลายทาง",
      dataIndex: "cod",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
    },
    {
      title: "",
      key: "action",
      render: (value: any) => {
        console.log("test", value);
        return (
          <Space size="middle">
            <Col>
              <Button
                onClick={() => onClick(value)}
                size="small"
                style={{
                  width: 60,
                  backgroundColor: "#262626",
                  color: "#ffffff",
                }}
              >
                Edit
              </Button>
            </Col>
          </Space>
        );
      },
    },
  ];
  return (
    <Form form={form}>
      {/* <Layout> */}
      <Card title={"SOL"} style={{ margin: 70 }}>
        <Row justify={"center"}>
          <Col span={10} style={{ margin: 10 }}>
            <Form.Item name="stores" label="ร้านค้า">
              <Select style={{ width: 120 }} allowClear options={getStores} />
            </Form.Item>
            <Form.Item name="" label="รหัสใบสั่งของ">
              <Input></Input>
            </Form.Item>
            <Form.Item name="" label="ชื่อร้านค้า">
              <Input></Input>
            </Form.Item>
            <Form.Item name="" label="ระยะเวลา">
              <DatePicker /> <DatePicker />
            </Form.Item>
            <Form.Item name="" label="แขวง/ตำบล">
              <Input></Input>
            </Form.Item>
            <Form.Item name="" label="รหัสไปรษณี">
              <Input></Input>
            </Form.Item>
            <Form.Item name="" label="ค่าส่งปลายทางต่ำสุด">
              <Input></Input>
            </Form.Item>
            <Form.Item name="" label="เรียงค่าส่งปลายทาง">
              <Select style={{ width: 120 }} options={[]} />
            </Form.Item>
          </Col>

          <Col span={10} style={{ margin: 10 }}>
            <Form.Item name="" label="รหัสสินค้า">
              <Input></Input>
            </Form.Item>
            <Form.Item name="" label="สถานะใบสั่งของ">
              <Select style={{ width: 120 }} options={[]} />
            </Form.Item>
            <Form.Item name="" label="เบอร์โทรศัพท์">
              <Input></Input>
            </Form.Item>
            <Form.Item name="" label="เขต/อำเภอ">
              <Input></Input>
            </Form.Item>
            <Form.Item name="" label="จังหวัด">
              <Input></Input>
            </Form.Item>
            <Form.Item name="" label="เก็บเงินปลายทาง">
              <Select style={{ width: 120 }} options={[]} />
            </Form.Item>
            <Form.Item name="" label="ค่าเก็บเงินปลายทางสูงสุด">
              <Input></Input>
            </Form.Item>
            <Form.Item name="" label="ระยะทาง">
              <Select
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={"end"}>
          <Button>
            <SearchOutlined />
            ค้นหา
          </Button>
        </Row>
      </Card>
      <Card
        title={<div>รายการขาย SOL</div>}
        style={{ marginLeft: 70, marginRight: 70 }}
      >
        <Button
          className=" bg-teal-600"
          onClick={() => navigate("/AddOrderPage")}
        >
          เพิ่มรายการสั่งของ
        </Button>
        <CustomTable
          data={orderData}
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
          key={""}
        />
      </Card>
      {/* </Layout> */}
    </Form>
  );
}
export default Order;
