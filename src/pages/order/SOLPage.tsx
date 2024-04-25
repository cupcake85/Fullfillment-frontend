import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import CustomTable from "../../component/table";
import axios from "axios";
import { useNavigate } from "react-router";
import { ColumnsType } from "antd/es/table";
import { getOrder } from "../../service/order";

function Order() {
  const [orderData, setOrderData] = useState([]);
  const [getStores, setStores] = useState();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    getOrderList();
  }, []);

  useEffect(() => {
    getStore();
  }, []);

  const onClick = (value?: any) => {
    navigate("/UpdateOrderPage", {
      state: {
        id: value.id,
      },
    });
  };

  const onClickHistory = (value?: any) => {
    navigate("/OrderHistory", {
      state: {
        id: value.id,
      },
    });
  };

  const getOrderList = async () => {
    const sortedData = await getOrder();
    setOrderData(sortedData);
  };

  const getStore = async () => {
    const request = await axios.get("http://192.168.2.57:3000/stores");
    const sortedData = request.data.data.items.map((data: any) => {
      return { label: data.name, value: data.id };
    });

    setStores(sortedData);
  };

  const columns: ColumnsType<Record<string, unknown>> = [
    {
      title: "#",
      align: "center",
      render: (_: any, __: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: "รายละเอียด",
      dataIndex: "customerName",
      align: "center",
    },
    {
      title: "วันที่",
      dataIndex: "orderDate",
      align: "center",
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
      align: "center",
    },
    {
      title: "รหัสไปรษณี",
      dataIndex: "zipCode",
      align: "center",
    },
    {
      title: "เก็บเงินปลายทาง",
      dataIndex: "cod",
      align: "center",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      align: "center",
      render: (rc: any) => {
        let status = "";
        let backgroundColor = "";

        switch (rc) {
          case "NOTCHECKED":
            status = "สินค้ายังไม่ถูกตรวจสอบ";
            backgroundColor = "#BC211C";
            break;
          case "OUTOFSTOCK":
            status = "กำลังแพ็คของออกจากคลัง";
            backgroundColor = "#78CBC1";
            break;
          case "INPROGRESS":
            status = "สินค้ากำลังดำเนินการ";
            backgroundColor = "#EF8822";
            break;
          case "DELIVERED":
            status = "จัดส่งสินค้าเรียบร้อย";
            backgroundColor = "#679CCE";
            break;
          case "RETURNED":
            status = "สินค้าถูกนำกลับ";
            backgroundColor = "#000000";
            break;
        }
        return (
          <>
            <div
              className=" text-center text-white rounded-3xl p-1"
              style={{ backgroundColor }}
            >
              {status}
            </div>
          </>
        );
      },
    },
    {
      title: "",
      key: "action",
      align: "center",
      render: (value: any) => {
        return (
          <Space size="middle">
            <Col>
              <Button
                onClick={() => onClick(value)}
                size="small"
                style={{
                  width: 60,
                  backgroundColor: "#262626",
                  color: "#ffffff",
                }}
              >
                แก้ไข
              </Button>
              <Button
                onClick={() => onClickHistory(value)}
                size="small"
                style={{ width: 60 }}
              >
                ประวัติ
              </Button>
            </Col>
          </Space>
        );
      },
    },
  ];
  return (
    <Form form={form}>
      <Card title={"SOL"} style={{ margin: 70 }}>
        <Row justify={"center"}>
          <Col span={10} style={{ margin: 10 }}>
            <Form.Item name="stores" label="ร้านค้า">
              <Select
                placeholder="EVE"
                className=" rounded-3xl float-end "
                allowClear
                options={getStores}
                style={{width:"250px"}}
              />
            </Form.Item>

            <Form.Item name="" label="รหัสใบสั่งของ">
              <Input
                placeholder="รหัสใบสั่งของ"
                className=" rounded-3xl w-[250px] float-end"
              ></Input>
            </Form.Item>

            <Form.Item name="" label="ชื่อร้านค้า">
              <Input
                placeholder="ชื่อร้านค้า"
                className="rounded-3xl w-[250px] float-end"
              ></Input>
            </Form.Item>

            <Form.Item name="" label="ระยะเวลา">
              <DatePicker /> <DatePicker />
            </Form.Item>

            <Form.Item name="" label="แขวง/ตำบล">
              <Input
                placeholder="พลับพลา"
                className="rounded-3xl w-[250px] float-end"
              ></Input>
            </Form.Item>

            <Form.Item name="" label="รหัสไปรษณี">
              <Input
                placeholder="10820"
                className="rounded-3xl w-[250px] float-end"
              ></Input>
            </Form.Item>

            <Form.Item name="" label="ค่าส่งปลายทางต่ำสุด">
              <Input
                placeholder="40 บาท"
                className="rounded-3xl w-[250px] float-end"
              ></Input>
            </Form.Item>

            <Form.Item name="" label="เรียงค่าส่งปลายทาง">
              <Select
                placeholder="ค่าน้อยขึ้นก่อน"
                className="rounded-3xl float-end"
                options={[]}
                style={{width:"250px"}}
              />
            </Form.Item>
          </Col>

          <Col span={10} style={{ margin: 10 }}>
            <Form.Item name="" label="รหัสสินค้า">
              <Input
                placeholder="WHO041"
                className=" rounded-3xl w-[250px] float-end"
              ></Input>
            </Form.Item>

            <Form.Item name="" label="สถานะใบสั่งของ">
              <Select
                placeholder="สถานะใบสั่งของ"
                className="rounded-3xl float-end"
                options={[]}
                style={{width:"250px"}}
              />
            </Form.Item>

            <Form.Item name="" label="เบอร์โทรศัพท์">
              <Input
                placeholder="086-943-9832"
                className="rounded-3xl w-[250px] float-end"
              ></Input>
            </Form.Item>

            <Form.Item name="" label="เขต/อำเภอ">
              <Input
                placeholder="วังทองหลาง"
                className="rounded-3xl w-[250px] float-end"
              ></Input>
            </Form.Item>

            <Form.Item name="" label="จังหวัด">
              <Input
                placeholder="กรุงเทพมหานคร"
                className="rounded-3xl w-[250px] float-end"
              ></Input>
            </Form.Item>

            <Form.Item name="" label="เก็บเงินปลายทาง">
              <Select
                placeholder="เก็บเงินปลายทาง"
                className="rounded-3xl float-end"
                options={[]}
                style={{width:"250px"}}
              />
            </Form.Item>

            <Form.Item name="" label="ค่าเก็บเงินปลายทางสูงสุด">
              <Input
                placeholder="150 บาท"
                className="rounded-3xl w-[250px] float-end"
              ></Input>
            </Form.Item>

            <Form.Item name="" label="ระยะทาง">
              <Select
                placeholder="SR Zone"
                className="rounded-3xl float-end"
                options={[]}
                style={{width:"250px"}}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={"end"}>
          <Button
            style={{
              backgroundColor: "#2F353A",
              borderRadius: "25px",
              marginBottom: "15px",
              height: "40px",
              width: "150px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <SearchOutlined />
            ค้นหา
          </Button>
        </Row>
      </Card>
      <Card
        title={<div>รายการขาย SOL</div>}
        style={{ marginLeft: 70, marginRight: 70 }}
      >
        <Button
          onClick={() => navigate("/AddOrderPage")}
          style={{
            backgroundColor: "#2F353A",
            borderRadius: "25px",
            marginBottom: "15px",
            height: "40px",
            width: "150px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          เพิ่มรายการสั่งของ
        </Button>
        <CustomTable
          data={orderData}
          columns={columns}
          pagination={{
            current: 0,
            setCurrent: function (value: number): void {
              throw new Error("Function not implemented.");
            },
          }}
          pageSize={{
            pageSize: 0,
            setPageSize: function (value: number): void {
              throw new Error("Function not implemented.");
            },
          }}
          total={0}
          key={""}
        />
      </Card>
    </Form>
  );
}
export default Order;
