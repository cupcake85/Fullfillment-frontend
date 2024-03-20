import React, { useState } from 'react';
import { Button, Card, Modal, Table, Input } from 'antd';
import '../warehouse.css';
import { TableRowSelection } from 'antd/es/table/interface';


const Warehouse = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hisModalOpen, setHisModalOpen] = useState(false);

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