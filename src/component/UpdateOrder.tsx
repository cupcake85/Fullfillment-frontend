import {
  Button,
  Form,
  Select,
  Table,
  TableColumnsType,
  notification,
  InputNumber,
  Input,
} from "antd";
import form, { FormInstance } from "antd/es/form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const UpdateOrder = ({form}:{
    form: FormInstance;
}) => {
  const [getItem, setItem] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [selectItem, setSelectItem] = useState([]);
  const navigate = useNavigate();

  const getItems = async () => {
    const request = await axios.get("http://192.168.2.57:3000/items");
    const sortedData = request.data.data.map((data: any) => {
      return { label: data.sku, value: data.id };
    });
    setItem(sortedData);
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleChange = (value: number[]) => {
    // console.log(value);
    const filter = getItem.filter((item: any) => value.includes(item.value)); //include เช็คทีละตัวว่า ใน value มีเหมือนกันกับ item.value
    // console.log(filter);
    setSelectItem(filter);
  };

  const handleSubmit = async (orderValue: any) => {
    console.log(orderValue);
    // const item = orderValue.item.map((id: any) => {
    //   return { itemId: id, qty: orderValue[id] };
    // });
    // console.log({ ...orderValue, item });
    // try {
    //   console.log(orderValue);
    //   await axios.post("http://192.168.2.57:3000/order", {
    //     ...orderValue,
    //     item,
    //   });
    //   api.success({
    //     message: "Success",
    //     description: "Item added successfully",
    //   });
    // } catch (error) {
    //   api.error({
    //     message: "Error",
    //   });
    // } finally {
    //   navigate("/SOLPage");
    // }
  };

  const columns: TableColumnsType = [
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
          // onClick={()=>navigate("/SOLPage")}
        >
          บันทึก
        </Button>
      </Form.Item>
      {contextHolder}
    </Form>
  );
};

export default UpdateOrder;
