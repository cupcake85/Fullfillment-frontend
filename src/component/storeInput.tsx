import form from "antd/es/form";
import { Button, Form, FormInstance, Input, notification } from "antd";
import axios from "axios";

const InputStore = ({
  form,
  handleCancel,
  setIsReload,
}: {
  form: FormInstance;
  handleCancel: () => void;
  setIsReload: (value: boolean) => void;
}) => {
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = async (value: any) => {
    try {
      if(value.id){
        await axios.put("http://192.168.2.57:3000/stores/" + value.id, value);
        api.success({
          message: "Success",
          description: "Item update successfully",
        });
      } else {
        console.log(value);
        await axios.post("http://192.168.2.57:3000/stores/", value);
        api.success({
          message: "Success",
          description: "Item added successfully",
        });
      }
    } catch (error) {
      api.error({
        message: "Error",
      });
      console.log(error);
    } finally {
      form.resetFields();
      handleCancel();
    }
    setIsReload(true);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
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
      <Form.Item label="เบอร์โทร" name="phoneNumber">
        <Input />
      </Form.Item>
      <Form.Item label="อีเมล" name="email">
        <Input />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          backgroundColor: "#bc211c",
          margin: 10,
          color: "white",
          borderRadius: 100,
        }}
      >
        บันทึก
      </Button>
      <Button
        onClick={handleCancel}
        style={{
          backgroundColor: "#2F353A",
          color: "white",
          borderRadius: 100,
        }}
      >
        ยกเลิก
      </Button>
      {contextHolder} {/*มันคือ component*/}
    </Form>
  );
};

export default InputStore;
