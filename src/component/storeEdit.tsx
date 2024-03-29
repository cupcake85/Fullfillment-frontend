import form from "antd/es/form";
import { Button, Form, FormInstance, Input, notification } from "antd";
import axios from "axios";

const editStore = ({
  form,
  handleCancelEdit,
  setIsReload,
  getItemData,
}: {
  form: FormInstance;
  handleCancelEdit: () => void;
  getItemData: () => Promise<void>;
  setIsReload: (value: boolean) => void;
}) => {
  const [api, contextHolder] = notification.useNotification();

  function editOk() {
    const value = form.getFieldsValue([
      "id", //เพิ่มไอดีมาใน getfiled นี้ด้วย เพื่อเก็บไปใช้ในฟังก์ชัน updateStore ได้
      "name",
      "shipperCode",
      "shipperName",
      "zipCode",
      "phoneNumber",
      "email",
    ]);
    console.log('ข้อมูลที่ได้จาก getfield', value)
    updateStore(value.id, value);
    setIsReload(true);
  }

  const updateStore = async (id: number, value: any) => {
    try {
      const request = await axios.put("http://192.168.2.57:3000/stores/" + id, value);
      console.log("request post", request);
      getItemData(); // เมื่อทำการส่งข้อมูลสำเร็จ ให้ดึงข้อมูลคลังสินค้าใหม่
      handleCancelEdit();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    }
  };

  return (
    <Form layout="vertical"  form={form}>
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
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={editOk}
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
          onClick={handleCancelEdit}
          style={{
            backgroundColor: "#2F353A",
            color: "white",
            borderRadius: 100,
          }}
        >
          ยกเลิก
        </Button>
      </div>
      {contextHolder}
    </Form>
  );
};

export default editStore;
