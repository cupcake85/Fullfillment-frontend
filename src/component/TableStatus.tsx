import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import axios from "axios";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { DeleteFilled, DownOutlined, RetweetOutlined } from "@ant-design/icons";
import '../App.css'

interface DataType {
  details: string;
  date: string;
  address: string;
  zipCode: string;
  cod: string;
  email: string;
}
interface Props {
  status: string;
  changestatus?: boolean;
  customColumns?: any;
  statusReturn?: boolean;
  search?: Record<string, unknown>;
}

const TableStatus: React.FC<Props> = ({
  status,
  changestatus = false,
  customColumns,
  statusReturn,
  search,
}) => {
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [itemData, setItemData] = useState([]);
  const [statuschange, setStatusChange] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getItemData();
  }, []);

  useEffect(() => {
    if (selectedRows.length > 0 && statuschange.length > 0) {
      multipleSubmit();
    }
    setStatusChange(""); //เพื่อให้ state ใน [] เกิดการเปลี่ยนแปลงให้สามารถใช้ useEffect ได้
  }, [statuschange]);

  const onClickEdit = (value?: any) => {
    console.log(value);
    navigate("/UpdateOrderPage", {
      state: {
        id: value.id,
      },
    });
  };

  const onClickDetail = (value?: any) => {
    console.log("detail click", value);
    navigate("/DetailsOrderPage", {
      state: {
        id: value.id,
      },
    });
  };

  const onClickHistory = (value?: any) => {
    console.log("valueId", value);
    navigate("/OrderHistory", {
      state: {
        id: value.id,
      },
    });
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setStatusChange(key);
  };

  const items: MenuProps["items"] = [
    {
      label: "สินค้ายังไม่ถูกตรวจสอบ",
      key: "NOTCHECK",
    },
    {
      label: "กำลังแพ็คของออกจากคลัง",
      key: "OUTOFSTOCK",
    },
    {
      label: "สินค้ากำลังดำเนินการ",
      key: "INPROGRESS",
    },
    {
      label: "จัดส่งสินค้าเรียบร้อย",
      key: "DELIVERED",
    },
    {
      label: "สินค้าถูกนำกลับ",
      key: "RETURNED",
    },
  ];

  const rowSelection = {
    onChange: (_: React.Key[], selectedRow: DataType[]) => {
      //onChange เอาไปใช้ใน table ได้เลย
      setSelectedRows(selectedRow); // เมื่อมีการเลือกแถวใหม่ให้เซ็ตค่า state
    },
  };

  const getItemData = async () => {
    const request = await axios.get("http://192.168.2.57:3000/orders", {
      params: { status: status, ...search },
    });
    setItemData(request.data.data.items);
  };

  const multipleSubmit = () => {
    const orderId = selectedRows.map((item: any) => {
      return item.id;
    });
    const body = { orderId, status: { status: statuschange } }; //จัด format เตรียมส่งให้หลังบ้าน
    updateMultiple(body);
  };

  const updateMultiple = async (body: any) => {
    console.log("ได้อะไร", JSON.stringify(body));
    try {
      await axios.put(
        "http://192.168.2.57:3000/orders/update-status-multiple",
        body
      );
      getItemData();
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const deleteMutiItem = async (selectedRows: any) => {
    const body: any = { ids: selectedRows.map((e: any) => e.id) };

    Modal.confirm({
      title: "ยืนยันการลบ",
      content: "คุณต้องการลบรายการที่เลือกทั้งหมดหรือไม่?",
      onOk: async () => {
        try {
          await axios.delete(
            "http://192.168.2.57:3000/orders/remove-multiple",
            {
              data: body,
            }
          );

          // เรียกฟังก์ชัน getItemData() เพื่อโหลดข้อมูลใหม่หลังจากลบเสร็จ
          getItemData();
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการลบ:", error);
        }
      },
      onCancel: () => {
        console.log("ยกเลิกการลบ");
      },
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "รายละเอียด",
      dataIndex: "quantity",
      render: (rc: any) => {
        return (
          <div className=" border-[1px] border-slate-200 rounded-[10px] p-2 text-center">
            จำนวน : {rc}
          </div>
        );
      },
      align: "center",
    },
    {
      title: "วันที่",
      dataIndex: "orderDate",
      render: (rc: any) => {
        const date = dayjs(rc).format("DD/MM/YYYY");
        return <>{date}</>;
      },
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
      align: "center",
    },
    {
      title: "รหัสไปรษณีย์",
      dataIndex: "zipCode",
      align: "center",
    },
    {
      title: "เก็บเงินปลายทาง",
      dataIndex: "cod",
      render: (rc: any) => {
        let cod = "";
        if (rc !== null) {
          cod = rc;
        } else {
          cod = "0";
        }
        return <>{cod}</>;
      },
      align: "center",
    },
    {
      title: "สถานะ",
      align: "center",
      dataIndex: "status",
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
      title: "",
      width: "100px",
      render: (value: any) => {
        return (
          <div
            style={{
              textAlign: "center",
              backgroundColor: "white",
              color: "black",
              border:'solid 0.5px #E5E5E5',
              borderRadius: 9
            }}
          >
            <Button
              onClick={() => onClickEdit(value)}
              style={{
                fontSize: "12px",
                borderRadius: "5px 5px 0px 0px",
                width: 88,

              }}
            >
              แก้ไข
            </Button>
            <Button
              onClick={() => onClickDetail(value)}
              style={{
                fontSize: "12px",
                borderRadius: "0px 0px 0px 0px",
                width: 88,
              }}
            >
              รายละเอียด
            </Button>
            <Button
              onClick={() => onClickHistory(value)}
              style={{
                fontSize: "12px",
                borderRadius: "0px 0px 5px 5px",
                width: 88,
              }}
            >
              ประวัติ
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div hidden={!changestatus}>
        <Button
          style={{
            backgroundColor: "#2F353A",
            margin: "5px",
            borderRadius: "20px",
            color: "#fff",
          }}
        >
          <Dropdown
            menu={{ items, onClick }}
            placement="bottom"
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                เปลี่ยนแปลงสถานะ
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Button>
        <Button
          onClick={() => deleteMutiItem(selectedRows)}
          type="primary"
          style={{
            backgroundColor: "#2F353A",
            borderRadius: "20px",
          }}
        >
          <span>
            <DeleteFilled style={{ margin: "5px" }} />
            ลบ
          </span>
        </Button>
      </div>
      <div hidden={!statusReturn}>
        <Button
          style={{
            backgroundColor: "#979A9C",
            color: "white",
            borderRadius: "17px",
            marginBottom: "15px",
          }}
          icon={
            <RetweetOutlined
              style={{
                fontSize: "20px",
                marginRight: "10px",
              }}
            />
          }
          onClick={() => {
            setStatusChange("RETURNEDITEM");
          }}
        >
          นำกลับเข้าคลังสินค้า
        </Button>
      </div>

      <Table
        columns={customColumns ? customColumns : columns}
        dataSource={itemData}
        rowSelection={rowSelection}
        rowKey="id"
      />
    </>
  );
};

export default TableStatus;
