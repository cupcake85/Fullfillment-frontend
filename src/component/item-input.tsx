import form from "antd/es/form";
import { Button, Form, FormInstance, Input, notification } from "antd";
import axios from "axios";

const ItemInput = ({
  form,
  handleCancel,
}: {
  form: FormInstance;
  handleCancel: () => void;
}) => {
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = async (value: any) => {
    if(value.id){
      try {
        await axios.put("http://192.168.2.57:3000/items/" + value.id, value );
        api.success({
        message: "Success",
        description: "Item update successfully",
        });
      } catch(error) {
        api.error({
          message: "Error",
          // description: error.message ,
        });
      } finally {
        form.resetFields();
        handleCancel();
      }
      
    } else {
    try {
        console.log(value)
      await axios.post("http://192.168.2.57:3000/items/", value);
      api.success({
        message: "Success",
        description: "Item added successfully",
      });
    } catch (error) {
      api.error({
        message: "Error",
        // description: error.message ,
      });
      console.log(error)
    } finally {
      form.resetFields();
      handleCancel();
    }
  }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <Form.Item name="sku" label="sku">
        <Input></Input>
      </Form.Item>

      <Form.Item name="name" label="name">
        <Input></Input>
      </Form.Item>

      <Form.Item name="details" label="details">
        <Input></Input>
      </Form.Item>

      <Form.Item name="id" hidden>
        <Input></Input>
      </Form.Item>

        <Button type="primary" htmlType="submit">
            Submit
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      {contextHolder}
    </Form>
  );
};

export default ItemInput;