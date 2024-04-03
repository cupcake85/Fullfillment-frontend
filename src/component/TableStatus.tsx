import React, { useState } from "react";
import { Card, Layout, Table, TableProps } from "antd";

interface DataType {
  details: string;
  date: string;
  address: string;
  zipCode: string;
  cod: string;
  email: string;
}

interface Props {
  data: DataType[];
}

const TableComponent: React.FC<Props> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);

  const rowSelection = {
    onChange: (_: React.Key[], selectedRow: DataType[]) => {
      //onChange เอาไปใช้ใน table ได้เลย
      setSelectedRows(selectedRow); // เมื่อมีการเลือกแถวใหม่ให้เซ็ตค่า state
    },
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
  ];

  return (
    <Layout style={{ backgroundColor: "gray" }}>
      <Card style={{ margin: "70px" }}>
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
        />
      </Card>
    </Layout>
  );
};

export default TableComponent;
