import { Card, Col, Layout, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
export interface IorderDetail {
  id: number;
  customerName: string;
  orderDate: string;
  uom: string;
  cod: number;
  phoneNumber: string;
  address: string;
  alley: string;
  road: string;
  zipCode: string;
  province: string;
  district: string;
  parish: string;
  country: string;
  status: string;
  quantity: number;
  orderno: Orderno[];
}

export interface Orderno {
  id: number;
  quantity: number;
  item: Item;
}

export interface Item {
  id: number;
  sku: string;
  name: string;
  details: string;
  quantity: number;
  stores: Stores;
}

export interface Stores {
  id: number;
  name: string;
  shipperCode: string;
  shipperName: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  isDelete: boolean;
}

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
    <Layout className="  m-[70px]">
      <Card title={"รายการ"}>
        <Row className=" p-3">
          <Col className=" w-[50%]">
            <div className=" mb-3 text-[16px] font-bold p-1">
              รายละเอียดรายการ
            </div>
            <Row>
              <Col className=" bg-[#3B4248] text-white rounded-xl pl-4 py-4 pr-2 p-1 ">
                <p>สถานะ</p>
                <p>ร้านค้า</p>
                <p>วันที่</p>
                <p>COD เรียกเก็บ</p>
                <p>UOM</p>
              </Col>
              <Col className=" col-span-2 bg-[#FBFBFB] !text-primary rounded-r-[10px] pl-4 py-4 pr-2 w-[70%]">
                <div>
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
                <p>{detail?.orderno[0]?.item.stores.name}</p>{" "}
                {/*จะใช้ข้อมูลจากรายการสั่งซื้อแรก หรือตำแหน่งที่ 0 ในอาร์เรย์ orderno*/}
                <p>{dayjs(detail?.orderDate).format("DD/MM/YYYY")}</p>
                <p>{detail?.cod}</p>
                <p>{detail?.uom}</p>
              </Col>
            </Row>
          </Col>
          <Col className="w-[50%]">
            <div className=" mb-3 text-[16px] font-bold p-1 ">
              รายละเอียดร้านค้า
            </div>
            <Row>
              <Col className=" bg-[#3B4248] text-white rounded-xl pl-4 py-4 pr-2 p-1  ">
                <p>ชื่อร้านค้า</p>
                <p>ที่อยู่</p>
                <p>เขต/อำเภอ</p>
                <p>แขวง/ตำบล</p>
                <p>จังหวัด</p>
                <p>ประเทศ</p>
                <p>รหัสไปรษณีย์</p>
                <p>โทรศัพท์</p>
              </Col>
              <Col className=" col-span-2 bg-[#FBFBFB] rounded-r-[10px] pl-4 py-4 pr-2 w-[70%]">
                <p>{detail?.orderno[0]?.item.stores.name}</p>
                <p>{detail?.address}</p>
                <p>{detail?.district}</p>
                <p>{detail?.parish}</p>
                <p>{detail?.province}</p>
                <p>{detail?.country}</p>
                <p>{detail?.zipCode}</p>
                <p>{detail?.phoneNumber}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <div className=" flex flex-row justify-between w-100vw mt-6">
        <Card title="สินค้า" className=" w-[50%] mr-4">
          <Table columns={column} dataSource={detail?.orderno} rowKey="id" />
        </Card>
        <Card title="หมายเลขติดตาม" className=" w-[50%] ml-4">
          <Row>
            <Col className=" bg-[#3B4248] text-white rounded-xl pl-4 py-4 pr-2 p-1">
              <p>หมายเลขติดตาม</p>
              <p>วันที่</p>
              <p>เวลา</p>
            </Col>
            <Col className=" col-span-2 bg-[#FBFBFB] rounded-r-[10px] pl-4 py-4 pr-2  w-[70%]">
              <p>{detail?.orderno[0].id}</p>
              <p>ยังไม่มี</p>
              <p>{dayjs(detail?.orderDate).format("HH:mm:ss")}</p>
            </Col>
          </Row>
        </Card>
      </div>
    </Layout>
  );
};

export default DetailsOrder;
