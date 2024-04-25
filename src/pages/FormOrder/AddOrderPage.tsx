import {
  Button,
  Form,
  Select,
  Table,
  TableColumnsType,
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
    console.log("add", orderValue);
    const item = orderValue.item.map((id: any) => {
      return { itemId: id, qty: orderValue[id] };
    });
    try {
      console.log("order", { ...orderValue });
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
          <Row>
            <Col span={4}></Col>
            <Col span={12}>
              <Form onFinish={handleSubmit}>
                <Form.Item name="uom">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>UOM</div>
                    <Input
                      placeholder="Box"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="cod">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>COD</div>
                    <InputNumber
                      placeholder="0"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="item">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>Item</div>
                    <Select
                      placeholder="WHO054"
                      mode="multiple"
                      style={{ width: "25vw", height: "5vh" }}
                      options={getItem}
                      onChange={handleChange}
                    />
                  </Row>
                </Form.Item>

                <Form.Item>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div></div>
                    <Table
                      style={{ width: "25vw" }}
                      dataSource={selectItem}
                      columns={columns}
                    ></Table>
                  </Row>
                </Form.Item>

                <Form.Item name="customerName">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>ชื่อลูกค้า</div>
                    <Input
                      placeholder="Mark Zuckerberg"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="phoneNumber">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>เบอร์โทรศัพท์</div>
                    <Input
                      placeholder="062xxxxxxx"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="address">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>ที่อยู่</div>
                    <Input
                      placeholder="123 ลาดพร้าว พลับพลา วังทองหลาง"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="alley">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>ซอย</div>
                    <Input
                      placeholder="ลาดพร้าว"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="road">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>ถนน</div>
                    <Input
                      placeholder="ลาดพร้าว"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="zipCode">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>รหัสไปรษณีย์</div>
                    <Input
                      placeholder="10310"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="province">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>จังหวัด</div>
                    <Input
                      placeholder="กรุงเทพฯ"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="district">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>เขต/อำเภอ</div>
                    <Input
                      placeholder="วังทองหลาง"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="parish">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>แขวง/ตำบล</div>
                    <Input
                      placeholder="พลับพลา"
                      className=" rounded-3xl w-[25vw] h-[5vh]"
                    />
                  </Row>
                </Form.Item>

                <Form.Item name="country">
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontFamily: "kanit" }}>ประเทศ</div>
                    <Select
                      placeholder="ประเทศ"
                      style={{ width: "25vw", height: "5vh" }}
                      options={[{ value: "ThaiLand", label: "ThaiLand" }]}
                    />
                  </Row>
                </Form.Item>

                <Row
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div></div>
                  <Row>
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
                      >
                        ยกเลิก
                      </Button>
                    </Form.Item>
                  </Row>
                </Row>
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
