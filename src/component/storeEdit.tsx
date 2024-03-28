import form from "antd/es/form";
import { Button, Form, FormInstance, Input, notification } from "antd";
import axios from "axios";

const editStore = ({
  form,
  handleCancelEdit,
  setIsReload
}: {
  form: FormInstance;
  handleCancelEdit: () => void;
  setIsReload:(value:boolean)=>void
}) => {
  const [api, contextHolder] = notification.useNotification();

  function editOk() {
    const value = form.getFieldValue([
      "name",
      "shipperCode",
      "shipperName",
      "zipCode",
      "phoneNumber",
      "email",
    ]);
    updateStore(value.id, value);
    handleCancelEdit();
  }

  const updateStore = async (id: number, value: any) => {
    try {
      const request = await axios.post(
        "http://192.168.2.57:3000/stores/" + id,
        value
      );
      console.log("request post", request);
      setIsReload(true)
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <Form layout="vertical" onFinish={editOk} form={form}>
      <Form.Item label="ชื่อลูกค้า" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="รหัสผู้จัดส่ง" name="shipperCode">
        <Input />
      </Form.Item>
      <Form.Item label="ชื่อผู้จัดส่ง" name="shipperName">
        <Input />
      </Form.Item>
      <Form.Item label="รหัสไปรษณีย์" name="zipCode">
        <Input />
      </Form.Item>
      <Form.Item label="เบอร์โทร" name="phoneNumber" >
        <Input />
      </Form.Item>
      <Form.Item label="อีเมล" name="email">
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button onClick={handleCancelEdit}>Cancel</Button>
      {contextHolder}
    </Form>
  );
};

export default editStore;
