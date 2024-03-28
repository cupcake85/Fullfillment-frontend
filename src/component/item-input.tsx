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

  const handleSubmit = async (value:any) => {
    if(value.id){
      
      try {
        value.stores = parseInt(value.stores);
        await axios.put("http://192.168.2.57:3000/items/" + value.id, value );
        // console.log(value)
        api.success({
        message: "Success",
        description: "Item updated successfully",
        });
      } catch(error) {
        api.error({
          message: "Error",
        });
      } finally {
        form.resetFields();
        handleCancel();
      }
      
    } else {
    try {
      value.stores = parseInt(value.stores);
      await axios.post("http://192.168.2.57:3000/items/", value);
      console.log(value)
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

      <Form.Item name="stores" label="stores" >
        <Input></Input>
      </Form.Item>

      <Form.Item name="details" label="details">
        <Input></Input>
      </Form.Item>

      <Form.Item name="id" hidden>
        <Input></Input>
      </Form.Item>

        <Button type="primary" htmlType="submit" style={{backgroundColor:"#1677ff"}}>
            Submit
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      {contextHolder}
    </Form>
  );
};

export default ItemInput;