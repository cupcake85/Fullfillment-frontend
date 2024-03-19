import React, { useState } from 'react';
import { Button, Card, Modal, Table, Input  } from 'antd';
import '../warehouse.css';


const Warehouse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      dataIndex: 'key'
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
        <span style={{ display: 'flex', flexDirection: 'column' }} >
          <Button type="primary" style={{ marginBottom: '8px' }} onClick={showModal}>แก้ไข</Button>{" "}
          <Modal title="แก้ไขสินค้า" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ display: 'flex', flexDirection: 'column' , borderRadius:20}} >
              SKU<Input type='number' />
              สินค้าคงเหลือ <Input type='text' />
              เพิ่ม/ลดสินค้า<Input type='text' />
              หมายเหตุ <Input type='text' />
            </div>
          </Modal>
          <Button type="default">ประวัติ</Button>
        </span>
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
      key: '1',
      name: 'SunDose',
      sku: "WHO050",
      detail: 'New York No. 1 Lake Park',
      store: 'LRT White',
      storage: 'Zone A/ Rack A2',
      total: 100
    },
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
      key: '1',
      name: 'SunDose',
      sku: "WHO050",
      detail: 'New York No. 1 Lake Park',
      store: 'LRT White',
      storage: 'Zone A/ Rack A2',
      total: 100
    },
    {
      key: '1',
      name: 'SunDose',
      sku: "WHO050",
      detail: 'New York No. 1 Lake Park',
      store: 'LRT White',
      storage: 'Zone A/ Rack A2',
      total: 100
    },


  ];

  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: (record: DataType) => ({
  //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };


  return (
    <Card
      title='คลังสินค้า'
      bordered={false}
      style={{
        backgroundColor: 'white',
        margin: 46,
        borderRadius: 20
      }}>
      <Button className='btn-manage'>เพิ่ม</Button> {" "}
      <Button className='btn-manage'>ลด</Button>
      <Table
        // pagination={{ defaultCurrent: 6, total: 500 }}
        style={{ backgroundColor: ' #e4e5e5' }}
        dataSource={data}
        columns={columns}
        scroll={{ x: 1000 }} //ความกว้าง scroll ได้ 1200
      />
    </Card>

  )
}

export default Warehouse