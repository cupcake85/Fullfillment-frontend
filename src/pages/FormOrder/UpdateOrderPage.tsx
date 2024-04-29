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
  Row,
  Col,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { getOrderById, putOrderById } from "../../service/order";
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

  useEffect(() => {
    if (id) {
      getOrderItem();
    }
  }, []);

  const getOrderItem = async () => {
    const requestOrder = await getOrderById(id);
    const requestItem = await axios.get("http://192.168.2.57:3000/items");
    const orders = requestOrder.orderno?.map((order: any) => order.item.id);

    const items = requestItem?.data?.data
      ?.filter((item: any) => orders.includes(item.id))
      .map((item: any) => {
        return { label: item.sku, value: item.id };
      });
    const tableqty = orders.reduce((prev: any, current: any) => {
      return {
        ...prev,
        [current]: requestOrder.orderno.find(
          (order: any) => order.item.id == current
        )?.quantity,
      };
    }, {});

    form.setFieldsValue({
      ...requestOrder,
      item: orders,
      ...tableqty,
    });
    setSelectItem(items);
  };

  const getItems = async () => {
    const request = await axios.get("http://192.168.2.57:3000/items");
    const sortedData = request.data.data.map((data: any) => {
      return { label: data.sku, value: data.id };
    });
    setItem(sortedData);
  };

  const handleSubmit = async (valueOrder: any) => {
    valueOrder.cod = parseInt(valueOrder.cod);
    const item = valueOrder.item.map((id: any) => {
      return { itemId: id, qty: valueOrder[id] };
    });
    try {
      const body: Partial<CreateOrder> = {
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
      await putOrderById(id, body);

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
        <div
          style={{
            backgroundColor: "#FFFFFF",
            fontFamily: "kanit",
          }}
        >
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col
              span={16}
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "kanit",
              }}
            >
              <Form onFinish={handleSubmit} form={form}>
                <Form.Item name="uom" label="UOM" >
                  <Input
                    placeholder="Box"
                    style={{
                      borderRadius: "50px",
                      width: "25vw",
                      height: "5vh",
                    }}
                  />
                </Form.Item>

                <Form.Item name="cod" label="COD">
                  <InputNumber
                    placeholder="0"
                    style={{
                      borderRadius: "50px",
                      width: "25vw",
                      height: "5vh",
                    }}
                  />
                </Form.Item>


                <Form.Item name="item" label="Item">
                  <Select
                    placeholder="WHO054"
                    mode="multiple"
                    style={{ width: "25vw", height: "5vh" }}
                    options={getItem}
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item>
                  <Table
                    style={{ width: "25vw" }}
                    dataSource={selectItem}
                    columns={columns}
                  ></Table>
                </Form.Item>

                <Form.Item name="customerName" label="ชื่อลูกค้า">
                  <Input
                    placeholder="Mark Zuckerberg"
                    className="rounded-3xl w-[25vw] h-[5vh]"
                  />
                </Form.Item>

                <Form.Item name="phoneNumber" label="เบอร์โทรศัพท์">
                  <Input
                    placeholder="061xxxxxxx"
                    style={{
                      borderRadius: "50px",
                      width: "25vw",
                      height: "5vh",
                    }}
                  />
                </Form.Item>

                <Form.Item name="address" label="ที่อยู่">
                  <Input
                    placeholder="123 ลาดพร้าว พลับพลา วังทองหลาง"
                    style={{
                      borderRadius: "50px",
                      width: "25vw",
                      height: "5vh",
                    }}
                  />
                </Form.Item>

                <Form.Item name="alley" label="ซอย">
                  <Input
                    placeholder="ลาดพร้าว"
                    style={{
                      borderRadius: "50px",
                      width: "25vw",
                      height: "5vh",
                    }}
                  />
                </Form.Item>

                <Form.Item name="road" label="ถนน">
                  <Input
                    placeholder="ลาดพร้าว"
                    style={{
                      borderRadius: "50px",
                      width: "25vw",
                      height: "5vh",
                    }}
                  />
                </Form.Item>

                <Form.Item name="zipCode" label="รหัสไปรษณีย์">
                  <Input
                    placeholder="10310"
                    style={{
                      borderRadius: "50px",
                      width: "25vw",
                      height: "5vh",
                    }}
                  />
                </Form.Item>

                <Form.Item name="province" label="จังหวัด">
                  <Input
                    placeholder="กรุงเทพฯ"
                    style={{
                      borderRadius: "50px",
                      width: "25vw",
                      height: "5vh",
                    }}
                  />
                </Form.Item>

                <Form.Item name="district" label="เขต/อำเภอ">
                  <Input
                    placeholder="วังทองหลาง"
                    style={{
                      borderRadius: "50px",
                      width: "25vw",
                      height: "5vh",
                    }}
                  />
                </Form.Item>

                <Form.Item name="parish" label="แขวง/ตำบล">
                  <Input
                    placeholder="พลับพลา"
                    style={{
                      borderRadius: "50px",
                      width: "25vw",
                      height: "5vh",
                    }}
                  />
                </Form.Item>

                <Form.Item name="country" label="ประเทศ">
                  <Select
                    placeholder="ประเทศ"
                    style={{ width: "25vw", height: "5vh" }}
                    options={[{ value: "ThaiLand", label: "ThaiLand" }]}
                    className="float-end"
                  />
                </Form.Item>

                <div
                  style={{
                    display: "flex",
                    justifyItems: "baseline",
                    justifyContent: "center",
                  }}
                >
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: "#BC211C",
                        borderRadius: "30px",
                        width: "6vw",
                        height: "4vh",
                        marginRight: 30,
                        fontFamily: "kanit",
                      }}
                    >
                      บันทึก
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#2F353A",
                        borderRadius: "30px",
                        width: "6vw",
                        height: "4vh",
                        fontFamily: "kanit",
                      }}
                      onClick={()=>navigate("/SOLPage")}
                    >
                      ยกเลิก
                    </Button>
                  </Form.Item>
                </div>
                {contextHolder}
              </Form>
            </Col>
          </Row>
        </div>
      </Card>
    </Layout>
  );
};

export default UpdateOrderPage;
