import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Row,
  Select,
} from "antd";
import Column from "antd/es/table/Column";
import React, { useState } from "react";
import CustomTable from "../../component/table";
import axios from "axios";

function Order() {
  const [orderData, setOrderData] = useState([]);

  const GetOrder = async () => {
    const request = await axios.get("http://192.168.2.57:3000/order");
    const sortedData = request.data.data;
    setOrderData(sortedData);
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "รายละเอียด", dataIndex: "" },
    { title: "วันที่", dataIndex: "" },
    {
      title: "ที่อยู๋",
      dataIndex: "address",
    },
    {
      title: "รหัสไปรษณี",
      dataIndex: "zipCode",
    },
    {
      title: "เก็บเงินปลายทาง",
      dataIndex: "",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
    },
  ];
  return (
    <Form>
      <Layout>
        <Card>
          <Row className="flex">
            <Col span={5}>
              <p>ร้านค้า</p>
              <p>รหัสใบสั่งของ</p>
              <p>ชื่อร้านค้า</p>
              <p>ระยะเวลา</p>
              <p>แขวง/ตำบล</p>
              <p>รหัสไปรษณี</p>
              <p>ค่าส่งปลายทางต่ำสุด</p>
              <p>เรียงค่าส่งปลายทาง</p>
            </Col>
            <Col span={7}>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
              <Input></Input>
              <Input></Input>
              <DatePicker picker="week" /> <DatePicker picker="week" />
              <Input></Input>
              <Input></Input>
              <Input></Input>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </Col>
            <Col span={5}>
              <p>รหัสสินค้า</p>
              <p>สถานะใบสั่งของ</p>
              <p>เบอร์โทรศัพท์</p>
              <p>เขต/อำเภอ</p>
              <p>จังหวัด</p>
              <p>เก็บเงินปลายทาง</p>
              <p>ค่าเก็บเงินปลายทางสูงสุด</p>
              <p>ระยะทาง</p>
            </Col>
            <Col span={7}>
              <Input></Input>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
              <Input></Input>
              <Input></Input>
              <Input></Input>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
              <Input></Input>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Button>
              <SearchOutlined />
              ค้นหา
            </Button>
          </Row>
        </Card>
        <Card>
          <CustomTable
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
          ></CustomTable>
        </Card>
      </Layout>
    </Form>
  );
}
export default Order;
