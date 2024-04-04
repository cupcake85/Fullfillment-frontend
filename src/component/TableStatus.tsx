import React, { useEffect, useState } from "react";
import { Card, Layout, Table, TableProps } from "antd";
import axios from "axios";
import EditPage from "./OrderAction/EditPage";

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
}

const TableStatus: React.FC<Props> = ({ status }) => {
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    getItemData();
  }, []);

  const rowSelection = {
    onChange: (_: React.Key[], selectedRow: DataType[]) => {
      //onChange เอาไปใช้ใน table ได้เลย
      setSelectedRows(selectedRow); // เมื่อมีการเลือกแถวใหม่ให้เซ็ตค่า state
    },
  };

  const getItemData = async () => {
    // const request = await axios.get("http://192.168.2.57:3000/stores/");
    const request = await axios.get(
      "http://192.168.2.57:3000/order/search/status",
      { params: { status: status } }
    );
    console.log("request", request);
    setItemData(request.data.data);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "รายละเอียด",
      dataIndex: "details",
    },
    {
      title: "วันที่",
      dataIndex: "date",
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
    },
    {
      title: "",
      width: "100px",

      render: (value: any) => {
        // return <EditTable />;
        return (
          <div style={{ textAlign: "center" }}>
            <div
              onClick={EditPage}
              style={{
                // backgroundColor: "red",
                fontSize: "12px",
                borderRadius: "5px 5px 0px 0px",
              }}
            >
              แก้ไข
            </div>
            <div
              style={{
                // backgroundColor: "pink",
                fontSize: "12px",
              }}
            >
              รายละเอียด
            </div>
            <div
              style={{
                // backgroundColor: "green",
                fontSize: "12px",
                borderRadius: "0px 0px 5px 5px",
              }}
            >
              ประวัติ
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={itemData}
      rowSelection={rowSelection}
    />
  );
};

export default TableStatus;
