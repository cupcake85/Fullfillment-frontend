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
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { postOrder } from "../../service/order";

const AddOrderPage = () => {
  const [getItem, setItem] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [selectItem, setSelectItem] = useState([]);
  const navigate = useNavigate();

  const getItems = async () => {
    const request = await axios.get("http://192.168.2.57:3000/items");
    const sortedData = request.data.data.map((data: any) => {
      return { label: data.sku, value: data.id };
    });
    setItem(sortedData);
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleChange = (value: number[]) => {
    const filter = getItem.filter((item: any) => value.includes(item.value)); //include เช็คทีละตัวว่า ใน value มีเหมือนกันกับ item.value
    setSelectItem(filter);
  };

  const handleSubmit = async (orderValue: any) => {
    orderValue.cod = parseInt(orderValue.cod);
    const item = orderValue.item.map((id: any) => {
      return { itemId: id, qty: orderValue[id] };
    });
    try {
      await postOrder({ ...orderValue, item });
      api.success({
        message: "Success",
        description: "บันทึกสำเร็จ",
      });
      navigate("/SOLPage");
    } catch (error) {
      api.error({
        message: "เกิดข้อผิดพลาด",
      });
    }
  };

  const columns: ColumnsType<[]> = [
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
      <Card className=" m-[70px]" title="เพิ่มรายการ order">
        <div
          style={{
            backgroundColor: "#FFFFFF",
            fontFamily: "kanit",
          }}
        >
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col
              span={13}
              style={{
                fontFamily: "kanit",
              }}
            >
              <Form onFinish={handleSubmit}>
                <Form.Item name="uom" label="UOM">
                  <Input
                    placeholder="Box"
                    className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                  />
                </Form.Item>

                <Form.Item
                  name="cod"
                  label="COD"
                >
                    <InputNumber
                      placeholder="0"
                      className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                    />
                </Form.Item>

                <Form.Item
                  name="item"
                  label="Item"
                >
                  <Select
                    placeholder="WHO054"
                    mode="multiple"
                    style={{ width: "25vw", height: "5vh" }}
                    className="float-end"
                    options={getItem}
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item
                >
                    <Table
                      style={{ width: "25vw" }}
                      className="float-end"
                      dataSource={selectItem}
                      columns={columns}
                    ></Table>
                </Form.Item>

                <Form.Item
                  name="customerName"
                  label="ชื่อลูกค้า"
                >
                    <Input
                      placeholder="Mark Zuckerberg"
                      className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                    />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  label="เบอร์โทรศัพท์"
                >
                    <Input
                      placeholder="062xxxxxxx"
                      className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                    />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="ที่อยู่"
                >
                    <Input
                      placeholder="123 ลาดพร้าว พลับพลา วังทองหลาง"
                      className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                    />
                </Form.Item>

                <Form.Item
                  name="alley"
                  label="ซอย"
                >
                    <Input
                      placeholder="ลาดพร้าว"
                      className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                    />
                </Form.Item>

                <Form.Item
                  name="road"
                  label="ถนน"
                >
                    <Input
                      placeholder="ลาดพร้าว"
                      className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                    />
                </Form.Item>

                <Form.Item
                  name="zipCode"
                  label="รหัสไปรษณีย์"
                >
                    <Input
                      placeholder="10310"
                      className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                    />
                </Form.Item>

                <Form.Item
                  name="province"
                  label="จังหวัด"
                >
                    <Input
                      placeholder="กรุงเทพฯ"
                      className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                    />
                </Form.Item>

                <Form.Item
                  name="district"
                  label="เขต/อำเภอ"
                >
                    <Input
                      placeholder="วังทองหลาง"
                      className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                    />
                </Form.Item>

                <Form.Item
                  name="parish"
                  label="แขวง/ตำบล"
                >
                    <Input
                      placeholder="พลับพลา"
                      className=" rounded-3xl w-[25vw] h-[5vh] float-end"
                    />
                </Form.Item>

                <Form.Item
                  name="country"
                  label="ประเทศ"
                >
                  <Select
                    placeholder="ประเทศ"
                    className="float-end"
                    style={{ width: "25vw", height: "5vh" }}
                    options={[{ value: "ThaiLand", label: "ThaiLand" }]}
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
                      onClick={() => navigate("/SOLPage")}
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

export default AddOrderPage;
