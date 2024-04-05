import React, { useEffect, useState } from "react";
import { Button, Card, Layout, Table, TableProps } from "antd";
import axios from "axios";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
  statuschange: string;
  setStatusChange: (value: string) => void;
  customColumns?: any;
}

const TableStatus: React.FC<Props> = ({
  status,
  statuschange,
  setStatusChange,
  customColumns,
}) => {
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [itemData, setItemData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getItemData();
  }, []);

  useEffect(() => {
    if (selectedRows.length > 0) {
      multipleSubmit();
    }
    setStatusChange(""); //เพื่อให้ state ใน [] เกิดการเปลี่ยนแปลงให้สามารถใช้ useEffect ได้
  }, [statuschange]);
  console.log("statuschange", statuschange);

  const rowSelection = {
    onChange: (_: React.Key[], selectedRow: DataType[]) => {
      //onChange เอาไปใช้ใน table ได้เลย
      setSelectedRows(selectedRow); // เมื่อมีการเลือกแถวใหม่ให้เซ็ตค่า state
      console.log("selectedRow -> ", selectedRow);
    },
  };

  const getItemData = async () => {
    const request = await axios.get("http://192.168.2.57:3000/order", {
      params: { status: status },
    });
    console.log("request ", { status }, request);
    setItemData(request.data.data);
  };

  const multipleSubmit = () => {
    //จัด format เตรียมส่งให้หลังบ้าน
    const orderId = selectedRows.map((item: any) => {
      return item.id;
    });
    const body = { orderId, status: { status: statuschange } };
    console.log("body ได้อะไร -> ", body);
    updateMultiple(body);
  };

  const updateMultiple = async (body: any) => {
    console.log("ได้อะไร", JSON.stringify(body));
    try {
      await axios.put(
        "http://192.168.2.57:3000/order/update-status-multiple",
        body
      );
      getItemData();
    } catch (err: any) {
      console.log(
        "multipleUpadate() เออเร่อ -> ",
        err?.response?.data?.message
      );
    }
  };

  const columns: TableProps<DataType>["columns"] = [
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
    },
    {
      title: "วันที่",
      dataIndex: "orderDate",
      render: (rc: any) => {
        const date = dayjs(rc.outDate).format("DD/MM/YYYY");
        return <>{date}</>;
      },
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
    },
    {
      title: "รหัสไปรษณีย์",
      dataIndex: "zipCode",
    },
    {
      title: "เก็บเงินปลายทาง",
      dataIndex: "cod",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      render: (rc: any) => {
        return <>{rc}</>;
      },
    },
    {
      title: "",
      width: "100px",
      render: (value: any) => {
        // return <EditTable />;
        return (
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => navigate("/EditPage")} //แก้ไข path ให้ไปหน้า edit ที่ต้องการ
              style={{
                // backgroundColor: "white",
                fontSize: "12px",
                borderRadius: "5px 5px 0px 0px",
                width: 88,
              }}
            >
              แก้ไข
            </Button>
            <Button
              style={{
                // backgroundColor: "pink",
                fontSize: "12px",
                borderRadius: "0px 0px 0px 0px",
                width: 88,
              }}
            >
              รายละเอียด
            </Button>
            <Button
              style={{
                // backgroundColor: "green",
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
    <Table
      columns={customColumns ? customColumns : columns}
      dataSource={itemData}
      rowSelection={rowSelection}
      rowKey="id"
    />
  );
};

export default TableStatus;
