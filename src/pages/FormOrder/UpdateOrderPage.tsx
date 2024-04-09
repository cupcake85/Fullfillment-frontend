import {
  Button,
  Form,
  Select,
  Table,
  notification,
  InputNumber,
  Input,
  Layout,
  Card,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { putOrderById } from "../../service/order";
import { CreateOrder } from "../../service/order/interface/interface";
import { ColumnsType } from "antd/es/table";

const UpdateOrderPage = () => {
  const [getItem, setItem] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [selectItem, setSelectItem] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = location.state;

  const [form] = Form.useForm();
  useEffect(() => {
    getItems();
  }, []);

  console.log("idUpdate", id);

  const getOrderItem = async () => {
    const requestOrder = await axios.get(
      "http://192.168.2.57:3000/orders/" + id
    );
    const requestItem = await axios.get("http://192.168.2.57:3000/items");
    const orders = requestOrder?.data?.data?.orderno?.map(
      (order: any) => order.item.id
    );
    const items = requestItem?.data?.data
      ?.filter((item: any) => orders.includes(item.id))
      .map((item: any) => {
        return { label: item.sku, value: item.id };
      });
    const tableqty = orders.reduce((prev: any, current: any) => {
      return {
        ...prev,
        [current]: requestOrder.data.data.orderno.find(
          (order: any) => order.item.id == current
        )?.quantity,
      };
    }, {});
    form.setFieldsValue({
      ...requestOrder?.data?.data,
      item: orders,
      ...tableqty,
    });
    setSelectItem(items);
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

  const handleSubmit = async (valueOrder: any) => {
    const item = valueOrder.item.map((id: any) => {
      return { itemId: id, qty: valueOrder[id] };
    });
    try {
      const body:Partial <CreateOrder> = {
        customerName: valueOrder.customerName,
        uom: valueOrder.uom,
        cod: valueOrder.cod,
        phoneNumber: valueOrder.phoneNumber,
        address: valueOrder.address,
        alley: valueOrder.alley,
        road: valueOrder.road,
        zipCode: valueOrder.zipCode,
        province: valueOrder.province,
        district: valueOrder.district,
        parish: valueOrder.parish,
        country: valueOrder.country,
        item,
      };
      await putOrderById(id, body );

      api.success({
        message: "Success",
        description: "แก้ไขข้อมูลเรียบร้อบ",
      });
    } catch (error) {
      api.error({
        message: "เกิดข้อผิดพลาด",
      });
    } finally {
      navigate("/SOLPage");
    }
  };

  const handleChange = (value: number[]) => {
    const filter = getItem.filter((item: any) => value.includes(item.value)); //include เช็คทีละตัวว่า ใน value มีเหมือนกันกับ item.value
    setSelectItem(filter);
  };

  const columns: ColumnsType<any> = [
    {
      title: "#",
      align: "center",
      render: (_: any, __: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "sku",
      dataIndex: "label",
      align: "center",
    },
    {
      title: "QTY",
      align: "center",
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
            <Input placeholder="กล่อง" className=" rounded-3xl w-[300px]" />
          </Form.Item>
          <Form.Item name="cod" label="COD">
            <InputNumber placeholder="0" className=" rounded-3xl w-[300px]" />
          </Form.Item>
          <Form.Item name="item" label="Item">
            <Select
            placeholder="เลือกสินค้า"
              mode="multiple"
              style={{ width: 300 }}
              options={getItem}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Table
              style={{ width: 300 }}
              dataSource={selectItem}
              columns={columns}
            ></Table>
          </Form.Item>
          <Form.Item name="customerName" label="ชื่อลูกค้า">
            <Input placeholder="ชื่อลูกค้า" className=" rounded-3xl w-[300px]" />
          </Form.Item>

          <Form.Item name="phoneNumber" label="เบอร์โทรศัพท์">
            <Input placeholder="061xxxxxxx" className=" rounded-3xl w-[300px]" />
          </Form.Item>
          <Form.Item name="address" label="ที่อยู่">
            <Input placeholder="ที่อยู่" className=" rounded-3xl w-[300px]" />
          </Form.Item>
          <Form.Item name="alley" label="ซอย">
            <Input placeholder="ซอย" className=" rounded-3xl w-[300px]" />
          </Form.Item>
          <Form.Item name="road" label="ถนน">
            <Input placeholder="ถนน" className=" rounded-3xl w-[300px]" />
          </Form.Item>
          <Form.Item name="zipCode" label="รหัสไปรษณีย์">
            <Input placeholder="10220" className=" rounded-3xl w-[300px]" />
          </Form.Item>
          <Form.Item name="province" label="จังหวัด">
            <Input placeholder="กรุงเทพฯ" className=" rounded-3xl w-[300px]" />
          </Form.Item>
          <Form.Item name="district" label="เขต/อำเภอ">
            <Input placeholder="วังทองหลาง" className=" rounded-3xl w-[300px]" />
          </Form.Item>
          <Form.Item name="parish" label="แขวง/ตำบล">
            <Input placeholder="พลับพลา" className=" rounded-3xl w-[300px]" />
          </Form.Item>
          <Form.Item name="country" label="ประเทศ">
            <Select
            placeholder="ประเทศ"
              style={{ width: 300 }}
              options={[
                { value: "ThaiLand", label: "ThaiLand" },
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
