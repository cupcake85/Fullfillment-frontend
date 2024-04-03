import { Card, Form, Layout } from "antd";
import Input from "../component/Input";

const OrderForm = () => {
  return (
    <Form >
      <Form.Item label="ชื่อลูกค้า">
        <Input />
      </Form.Item>
      <Form.Item label="UOM">
        <Input />
      </Form.Item>
      <Form.Item label="COD">
        <Input />
      </Form.Item>
      <Form.Item label="Item">
        <Input />
      </Form.Item>
      <Form.Item label="เบอร์โทรศัพท์">
        <Input />
      </Form.Item>
      <Form.Item label="ที่อยู่">
        <Input />
      </Form.Item>
      <Form.Item label="ซอย">
        <Input />
      </Form.Item>
      <Form.Item label="ถนน">
        <Input />
      </Form.Item>
      <Form.Item label="รหัสไปรษณีย์">
        <Input />
      </Form.Item>
      <Form.Item label="จังหวัด">
        <Input />
      </Form.Item>
      <Form.Item label="เขต/อำเภอ">
        <Input />
      </Form.Item>
      <Form.Item label="แขวง/ตำบล">
        <Input />
      </Form.Item>
      <Form.Item label="ประเทศ">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default OrderForm;
