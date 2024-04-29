import { Card, Col, Layout, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { IorderDetail } from "../../interface/orderDetail.interface";
import { ColumnsType } from "antd/es/table";

const DetailsOrder = () => {
  const [detail, setDetail] = useState<IorderDetail>();
  const location = useLocation();
  let { id } = location.state;

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  const getDetail = async () => {
    try {
      const response = await axios.get("http://192.168.2.57:3000/orders/" + id);
      const detailData = response.data.data;
      setDetail(detailData);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const column: ColumnsType<any> = [
    {
      title: "SKU",
      dataIndex: "item",
      render(value: any) {
        //rc = orderno
        return value.sku;
      },
      align: "center",
    },
    {
      title: "รายละเอียด",
      dataIndex: "item",
      render(value: any) {
        //rc = orderno
        return value.details;
      },
      align: "center",
    },
    {
      title: "จำนวน",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "จำนวนคงเหลือ",
      dataIndex: "item",
      render(value: any) {
        //rc = orderno
        return value.quantity;
      },
      align: "center",
    },
  ];

  return (
    <Layout className="  m-[70px] ">
      <Card title={"รายการ"} className=" mb-8 font-[kanit]">
        <Row className=" p-3 ">
          <Col className=" w-[50%] font-[kanit] " sm={24} md={24} lg={24} xl={12}>
            <div className=" mb-3 text-[16px] font-bold p-1">
              รายละเอียดรายการ
            </div>
            <div>
              <Row>
                <div className="bg-[#3B4248] rounded-l-[10px] text-white pl-4 py-4 pr-2 font-[kanit] w-[25%]">
                  <p className=" mb-4 ">สถานะ</p>
                  <p className=" mb-4">ร้านค้า</p>
                  <p className=" mb-4">วันที่</p>
                  <p className=" mb-4">COD เรียกเก็บ</p>
                  <p>UOM</p>
                </div>

                <div className="  bg-[#F7F7F7] !text-primary rounded-r-[10px] pl-4 py-4 pr-2 w-[60%] font-[kanit]">
                  <div className=" mb-4">
                    {(() => {
                      let status;
                      switch (detail?.status) {
                        case "NOTCHECKED":
                          status = "สินค้ายังไม่ถูกตรวจสอบ";
                          break;
                        case "OUTOFSTOCK":
                          status = "กำลังแพ็คของออกจากคลัง";
                          break;
                        case "INPROGRESS":
                          status = "สินค้ากำลังดำเนินการ";
                          break;
                        case "DELIVERED":
                          status = "จัดส่งสินค้าเรียบร้อย";
                          break;
                        case "RETURNED":
                          status = "สินค้าถูกนำกลับ";
                          break;
                        default:
                          status = "Unknown status";
                      }
                      return status;
                    })()}
                  </div>
                  <p className=" mb-4">
                    {detail?.orderno[0]?.item.stores.name}
                  </p>{" "}
                  <p className=" mb-4">
                    {dayjs(detail?.orderDate).format("DD/MM/YYYY")}
                  </p>
                  <p className=" mb-4">{detail?.cod}</p>
                  <p className=" mb-4">{detail?.uom}</p>
                </div>
              </Row>
            </div>
          </Col>
          <Col className="w-[50%]" sm={24} md={24} lg={24} xl={12}>
            <div className=" mb-3 text-[16px] font-bold p-1 font-[kanit]">
              รายละเอียดร้านค้า
            </div>
            <Row>
              <div className="bg-[#3B4248] rounded-l-[10px] text-white pl-4 py-4 pr-2 font-[kanit] w-[25%]">
                <p className=" mb-4 ">ชื่อร้านค้า</p>
                <p className=" mb-4">ที่อยู่</p>
                <p className=" mb-4">เขต/อำเภอ</p>
                <p className=" mb-4">แขวง/ตำบล</p>
                <p className=" mb-4">จังหวัด</p>
                <p className=" mb-4">ประเทศ</p>
                <p className=" mb-4">รหัสไปรษณีย์</p>
                <p className=" mb-4">โทรศัพท์</p>
              </div>
              <div className="  bg-[#F7F7F7] !text-primary rounded-r-[10px] pl-4 py-4 pr-2 w-[70%] font-[kanit]">
                <p className=" mb-4 ">{detail?.orderno[0]?.item.stores.name}</p>
                <p className=" mb-4 ">{detail?.address || "-"}</p>
                <p className=" mb-4 ">{detail?.district || "-"}</p>
                <p className=" mb-4 ">{detail?.parish || "-"}</p>
                <p className=" mb-4 ">{detail?.province || "-"}</p>
                <p className=" mb-4 ">{detail?.country || "-"}</p>
                <p className=" mb-4 ">{detail?.zipCode || "-"}</p>
                <p className=" mb-4 ">{detail?.phoneNumber || "-"}</p>
              </div>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card title="สินค้า">
        <div className=" mb-4 font-bold font-[kanit]">
          จำนวนสินค้า : {detail?.orderno.length} รายการ
        </div>
        <Table
          columns={column}
          dataSource={detail?.orderno}
          rowKey="id"
          scroll={{ x: 700 }}
        />
      </Card>
    </Layout>
  );
};

export default DetailsOrder;
