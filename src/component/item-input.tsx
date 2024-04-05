import { Button, Form, FormInstance, Input, Select, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const ItemInput = ({
  form,
  handleCancel,
  getItemData,
}: {
  form: FormInstance;
  handleCancel: () => void;
  getItemData: () => Promise<void>;
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [getStores, setStores] = useState();

  useEffect(() => {
    getStore();
  }, []);

  const handleSubmit = async (value: any) => {
    if (value.id) {
      try {
        // console.log(value)
        value.stores = parseInt(value.stores);
        await axios.put("http://192.168.2.57:3000/items/" + value.id, value);
        getItemData();
        api.success({
          message: "Success",
          description: "Item updated successfully",
        });
      } catch (error) {
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
        getItemData();
        api.success({
          message: "Success",
          description: "Item added successfully",
        });
      } catch (error) {
        api.error({
          message: "Error",
        });
        console.log(error);
      } finally {
        form.resetFields();
        handleCancel();
      }
    }
  };

  const getStore = async () => {
    const request = await axios.get("http://192.168.2.57:3000/stores");
    const sortedData = request.data.data.map((data: any) => {
      return { label: data.name, value: data.id };
    });

    setStores(sortedData);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <Form.Item name="sku" label="sku">
        <Input style={{ width: 300 }}></Input>
      </Form.Item>

      <Form.Item name="name" label="name">
        <Input style={{ width: 300 }}></Input>
      </Form.Item>

      <Form.Item name="stores" label="stores">
        <Select style={{ width: 120 }} allowClear options={getStores}></Select>
      </Form.Item>

      <Form.Item name="details" label="details">
        <Input style={{ width: 300 }}></Input>
      </Form.Item>

      <Form.Item name="id" hidden>
        <Input></Input>
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
      {contextHolder}
    </Form>
  );
};

export default ItemInput;
