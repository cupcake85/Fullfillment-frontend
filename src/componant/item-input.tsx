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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (value: any) => {
    try {
      await axios.post("http://localhost:3001/items", value);
      api.success({
        message: "Success",
        description: "Item added successfully",
      });
    } catch (error) {
      api.error({
        message: "Error",
        description: "Error while adding item",
      });
    } finally {
      form.resetFields();
      handleCancel();
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
      <Form.Item>
        <Button className="bg-[red]" type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Form.Item>
      {contextHolder}
    </Form>
  );
};

export default ItemInput;
