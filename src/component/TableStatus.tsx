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
  statuschange: string;
  setStatusChange: (value: string) => void;
}

const TableStatus: React.FC<Props> = ({
  status,
  statuschange,
  setStatusChange,
}) => {
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [itemData, setItemData] = useState([]);

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
    },
  };

  const getItemData = async () => {
    // const request = await axios.get("http://192.168.2.57:3000/stores/");
    const request = await axios.get("http://192.168.2.57:3000/order", {
      params: { status: status },
    });
    console.log("request", request);
    setItemData(request.data.data);
  };

  const multipleSubmit = () => {
    //จัด format เตรียมส่งให้หลังบ้าน
    const rowData = selectedRows.map((item: any) => {
      return { id: item.id, status: statuschange };
    });
    console.log("Rowdata ได้อะไร -> ", rowData);
    updateMultiple(rowData);
  };

  const updateMultiple = async (body: any) => {
    console.log(JSON.stringify(body));
    // try {
    //   await axios.put(
    //     "http://192.168.2.57:3000/items/update-quantity-multiple",
    //     body
    //   );
    //   getItemData();
    // } catch (err: any) {
    //   alert(err?.response?.data?.message);
    // }
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
      rowKey="id"
    />
  );
};

export default TableStatus;
