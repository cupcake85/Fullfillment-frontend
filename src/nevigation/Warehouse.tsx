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




const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    sku: 32,
    detail: "New York No. 1 Lake Park",
    store: "LRT White",
    storage: "Zone A/ Rack A2",
    total: 100,
  },
  {
    key: "2",
    name: "Jim Green",
    sku: 42,
    detail: "London No. 1 Lake Park",
    store: "LRT White",
    storage: "Zone A/ Rack A2",
    total: 100,
  },
  {
    key: "3",
    name: "Joe Black",
    sku: 32,
    detail: "Sydney No. 1 Lake Park",
    store: "LRT White",
    storage: "Zone A/ Rack A2",
    total: 100,
  },
  {
    key: "4",
    name: "Disabled User",
    sku: 99,
    detail: "Sydney No. 1 Lake Park",
    store: "LRT White",
    storage: "Zone A/ Rack A2",
    total: 100,
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showHisModal = () => {
    setHisModalOpen(true);
  };

  interface DataType {
    key: React.Key;
    sku: string;
    name: string;
    detail: string;
    store: string;
    storage: string;
    total: number;
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
    },
    {
      title: 'ชื่อสินค้า',
      dataIndex: 'name',
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
    {
      title: 'Action',
      render: () => (
        <>
          <span style={{ display: 'flex', flexDirection: 'column', width: '70px' }} >
            <Button type="primary" style={{ backgroundColor: 'grey' }} onClick={showModal}>แก้ไข</Button>
            <Modal title="แก้ไขสินค้า" open={isModalOpen}
              footer={[
                <div style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
                  <Button style={{ backgroundColor: 'red', color: 'white', borderRadius: '20px' }}
                    onClick={handleCancel}>บันทึก</Button>
                  <Button onClick={handleCancel}
                    style={{ backgroundColor: 'black', color: 'white', borderRadius: '20px' }}>ยกเลิก</Button>
                </div>
              ]}
            >
              <span style={{ display: 'flex', flexDirection: 'column', borderRadius: 20 }} >
                SKU<Input type='text' />
                สินค้าคงเหลือ <Input type='text' />
                เพิ่ม/ลดสินค้า<Input type='number' />
                หมายเหตุ <Input type='text' />
              </span>
            </Modal>
            <Button type="default" onClick={showHisModal}>ประวัติ</Button>
            <Modal title="Basic Modal" open={hisModalOpen} onOk={handleOk} onCancel={handleCancel}
              footer={[
                <div style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
                  <Button style={{ backgroundColor: 'red', color: 'white', borderRadius: '20px' }}
                    onClick={handleCancel}>บันทึก</Button>
                  <Button onClick={handleCancel}
                    style={{ backgroundColor: 'black', color: 'white', borderRadius: '20px' }}>ยกเลิก</Button>
                </div>
              ]}>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </span>
        </>
      ),
    }
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'SunDose',
      sku: "WHO050",
      detail: 'New York No. 1 Lake Park',
      store: 'LRT White',
      storage: 'Zone A/ Rack A2',
      total: 100
    },
    {
      key: '2',
      name: 'SunDose',
      sku: "WHO050",
      detail: 'New York No. 1 Lake Park',
      store: 'LRT White',
      storage: 'Zone A/ Rack A2',
      total: 100
    },

  ];

  const onSelectChange = (selectedRowKey: React.Key[]) => {
    setSelectedRowKeys(selectedRowKey);
  };

  const rowSelection : TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: 'radio',
  };

  return (
    <Card
      title='คลังสินค้า'
      bordered={false}
      style={{
        backgroundColor: 'white',
        margin: 65,
        borderRadius: 20
      }}>
      <Button className='btn-manage'>เพิ่ม</Button> {" "}
      <Button className='btn-manage'>ลด</Button>
      <Table
        rowSelection={rowSelection}
        pagination={{ defaultCurrent: 6, total: 500 }}
        style={{ backgroundColor: ' #e4e5e5' }}
        dataSource={data}
        columns={columns}
        scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
      />
    </Card>

  )
}

export default Warehouse;