import React, { useEffect, useState } from "react";
import { Button, Card, Col, Divider, Radio, Row, Table } from "antd";
import type { TableColumnsType } from "antd";
import axios from "axios";

interface DataType {
  key: React.Key;
  sku: number;
  name: string;
  detail: string;
  store: string;
  storage: string;
  total: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "SKU",
    dataIndex: "sku",
  },
  {
    title: "ชื่อสินค้า",
    dataIndex: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "รายละเอียด",
    dataIndex: "detail",
  },
  {
    title: "ร้านค้า",
    dataIndex: "store",
  },
  {
    title: "สถานที่เก็บสินค้า",
    dataIndex: "storage",
  },
  {
    title: "คงเหลือ",
    dataIndex: "total",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

const Warehouse = () => {
const [warehouse, setWarehouse] = useState ([])

  useEffect(() => {
    getWarehouse();
    
  }, []);

  const getWarehouse = async() =>
{
  const request = await axios.get('http://192.168.2.57:3000/item/')
  console.log (request)
  setWarehouse(request.data.data)
}


  return (
    <div >
      <Card title="คลังสินค้า">
        <Button>เพิ่ม</Button> <Button>ลบ</Button>
        <Divider />
      </Card>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={warehouse}
      />
    </div>
  );
};

export default Warehouse;
