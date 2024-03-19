import React, { useState } from 'react';
import { Button, Card, Divider, Radio, Table } from 'antd';
import type { TableColumnsType } from 'antd';

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
    title: '#',
    dataIndex: 'key'
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
  },
  {
    title: 'ชื่อสินค้า',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'รายละเอียด',
    dataIndex: 'detail',
  },
  {
    title: 'ร้านค้า',
    dataIndex: 'store'
  },
  {
    title: 'สถานที่เก็บสินค้า',
    dataIndex: 'storage'
  },
  {
    title: 'คงเหลือ',
    dataIndex: 'total'
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    sku: 32,
    detail: 'New York No. 1 Lake Park',
    store: 'LRT White', 
    storage: 'Zone A/ Rack A2',
    total: 100
  },
  {
    key: '2',
    name: 'Jim Green',
    sku: 42,
    detail: 'London No. 1 Lake Park',
    store: 'LRT White', 
    storage: 'Zone A/ Rack A2',
    total: 100
  },
  {
    key: '3',
    name: 'Joe Black',
    sku: 32,
    detail: 'Sydney No. 1 Lake Park',
    store: 'LRT White', 
    storage: 'Zone A/ Rack A2',
    total: 100
  },
  {
    key: '4',
    name: 'Disabled User',
    sku: 99,
    detail: 'Sydney No. 1 Lake Park',
    store: 'LRT White', 
    storage: 'Zone A/ Rack A2',
    total: 100
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const Warehouse = () => {
  return (
    <div>
      <Card title="คลังสินค้า" >
        <Button>เพิ่ม</Button>
        {" "}
        <Button>ลบ</Button>

      <Divider />

      <Table
        rowSelection={{
  
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    
      </Card>
    </div>

  )
}

export default Warehouse