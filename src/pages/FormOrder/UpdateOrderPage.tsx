import {
  Button,
  Form,
  Select,
  Table,
  TableColumnsType,
  notification,
  InputNumber,
  Input,
  Layout,
  Card,
} from "antd";
import form, { FormInstance } from "antd/es/form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const UpdateOrderPage = () => {
  const [getItem, setItem] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [selectItem, setSelectItem] = useState([]);
  // const navigate = useNavigate();
  const location = useLocation();
  let { id } = location.state;

  const [order, setOrder] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    getItems();
  }, []);
  const getOrderItem = async () => {
    console.log("item",getItem)
    
    const requestOrder = await axios.get("http://192.168.2.57:3000/order/" + id);
    const requestItem = await axios.get("http://192.168.2.57:3000/items");
    const orders = requestOrder?.data?.data?.orderno?.map((order:any)=>order.item.id)
    const items = requestItem?.data?.data?.filter((item:any)=>orders.includes(item.id)).map((item:any)=>{return {label: item.sku, value: item.id }})
    const tableqty = orders.reduce((prev:any,current:any) => {
      console.log(current)
      return {...prev,[current]:requestOrder.data.data.orderno.find((order:any)=> order.item.id == current)?.quantity}
    },{})
    form.setFieldsValue({...requestOrder?.data?.data,item:orders,...tableqty});

    console.log("Order",tableqty)
    
    
    // console.log(request.data.data);
    setSelectItem(items)

  };
  useEffect(() => {
    if (id) {
      getOrderItem();
    }
  }, []);

  const getItems = async () => {
    const request = await axios.get("http://192.168.2.57:3000/items");
    const sortedData = request.data.data.map((data: any) => {
      return { label: data.sku, value: data.id };
    });
    setItem(sortedData);
  };

  const handleChange = (value: number[]) => {
    const filter = getItem.filter((item: any) => value.includes(item.value)); //include เช็คทีละตัวว่า ใน value มีเหมือนกันกับ item.value
    setSelectItem(filter);
  };

  const handleSubmit = async () => {};

  const columns = [
    {
      title: "#",
      render: (_: any, __: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "sku",
      dataIndex: "label",
    },
    {
      title: "QTY",
      render: (value: any) => {
        return (
          <Form.Item name={value.value}>
            <InputNumber />
          </Form.Item>
        );
      },
    },
  ];

  return (
    <Layout>
      <Card className=" m-[70px]" title="แก้ไขรายการ order">
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item name="uom" label="UOM">
            <Input />
          </Form.Item>
          <Form.Item name="cod" label="COD">
            <InputNumber />
          </Form.Item>
          <Form.Item name="item" label="Item">
            <Select
              mode="multiple"
              style={{ width: 500 }}
              options={getItem}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Table dataSource={selectItem} columns={columns}></Table>
          </Form.Item>
          <Form.Item name="customerName" label="ชื่อลูกค้า">
            <Input />
          </Form.Item>

          <Form.Item name="phoneNumber" label="เบอร์โทรศัพท์">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="ที่อยู่">
            <Input />
          </Form.Item>
          <Form.Item name="alley" label="ซอย">
            <Input />
          </Form.Item>
          <Form.Item name="road" label="ถนน">
            <Input />
          </Form.Item>
          <Form.Item name="zipCode" label="รหัสไปรษณีย์">
            <Input />
          </Form.Item>
          <Form.Item name="province" label="จังหวัด">
            <Input />
          </Form.Item>
          <Form.Item name="district" label="เขต/อำเภอ">
            <Input />
          </Form.Item>
          <Form.Item name="parish" label="แขวง/ตำบล">
            <Input />
          </Form.Item>
          <Form.Item name="country" label="ประเทศ">
            <Select
              style={{ width: 500 }}
              options={[
                { value: "ThaiLand", label: "ThaiLand" },
                { value: "Japan", label: "Japan" },
                { value: "China", label: "China" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#1677ff" }}
            >
              บันทึก
            </Button>
          </Form.Item>
          {contextHolder}
        </Form>
      </Card>
    </Layout>
  );
};

export default UpdateOrderPage;
