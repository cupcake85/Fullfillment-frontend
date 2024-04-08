import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Layout, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = location.state;

  const columns:ColumnsType<any> = [
    {
      title: "วันที่",
      dataIndex: "orderStatusDate",
      align:"center",
      render: (_:any,rc:any) => {
        const date = dayjs(rc.outDate).format("DD/MM/YYYY");
        return <>{date}</>
      }
    },
    {
      title: "เวลา",
      dataIndex: "orderStatusDate",
      align:"center",
      render: (_:any,rc:any) => {
        const date = dayjs(rc.outDate).format("HH:mm:ss");
        return <>{date}</>
      }
    },
    {
      title: "รหัสอ้างอิงรายการ",
      dataIndex: "",
      align:"center",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      align:"center",
      render: (rc: any) => {
        let status = "";
        let backgroundColor = ""; // เพิ่มตัวแปรสำหรับสีพื้นหลัง

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
      title: "หมายเหตุ",
      dataIndex: "",
      align:"center",
    },
    {
      title: "ผู้ใช้งาน",
      dataIndex: "",
      align:"center",
    },
  ];

  useEffect(() => {
    if (id) {
      getHistoty();
    }
  }, [id]);

  console.log("id", id);

  const getHistoty = async () => {
    const history = await axios.get(
      "http://192.168.2.57:3000/orders/history-status/" + id
    );
    setOrderHistory(history.data.data);
    // console.log("Order", history);
  };

  return (
    <Layout>
      <Card title={"รายการ:"} style={{ margin: 70 }}>
        <Row>
          <Col span={5}>
            <p>วันที่เริ่ม</p>
          </Col>
          <Col span={7}>
            <DatePicker
              placeholder="2024-04-08"
              style={{ flex:"center", borderRadius: "25px" }}
            />
          </Col>
          <Col span={5}>
            <p>วันที่สุดท้าย</p>
          </Col>
          <Col span={7}>
            <DatePicker
              placeholder="2024-04-08"
              style={{ borderRadius: "25px" }}
            />
          </Col>
        </Row>
        <Button
          style={{
            backgroundColor: "#2F353A",
            borderRadius: "25px",
            marginBottom: "15px",
            height: "40px",
            width: "150px",
            color: "#fff",
          }}
        >
          {" "}
          <SearchOutlined /> ค้นหา
        </Button>
        <Table dataSource={orderHistory} columns={columns}></Table>
      </Card>
    </Layout>
  );
};

export default OrderHistory;
