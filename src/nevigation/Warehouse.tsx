import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Table, Input } from 'antd';
import '../warehouse.css';
import { TableRowSelection } from 'antd/es/table/interface';
import axios from 'axios';

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
  // {
  //   title: 'การจัดการ',
  //   dataIndex: 'operation',
  //   render: (_: any, record: any) => (
  //     <Button onClick={() => showHisModal(record)}>แก้ไข</Button>
  //   ),
  // },

];
const Warehouse = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hisModalOpen, setHisModalOpen] = useState(false);
  const [warehousedata, setWarehouse] = useState([]);

  useEffect(() => {
    getWarehouse();
  }, []);

  const getWarehouse = async () => {
    const request = await axios.get('http://192.168.2.57:3000/item/')
    console.log('request', request)
    setWarehouse(request.data.data)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showHisModal = (record: any) => {
    setHisModalOpen(true);
    // ทำอย่างอื่น ๆ เช่น ดึงข้อมูลสำหรับแก้ไขจาก record
  };

  const handleHisOk = () => {
    setHisModalOpen(false);
    // ทำการบันทึกการแก้ไขหรือปรับปรุงข้อมูลที่นี่
  };

  const handleHisCancel = () => {
    setHisModalOpen(false);
  };


  const onSelectChange = (selectedRowKey: React.Key[]) => {
    setSelectedRowKeys(selectedRowKey);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: 'radio',
  };

  return (
    <>
      <Card
        title='คลังสินค้า'
        bordered={false}
        style={{
          backgroundColor: 'white',
          margin: 65,
          borderRadius: 20
        }}>
        <div >
          <Button style={{ backgroundColor: '#979a9c', color: 'white', borderRadius: '17px', marginBottom: '15px' }}>เพิ่ม</Button>{' '}
          <Button style={{ backgroundColor: '#979a9c', color: 'white', borderRadius: '17px', marginBottom: '15px' }}>ลด</Button>
        </div>
        <Table
          rowSelection={rowSelection}
          pagination={{ defaultCurrent: 1 }} //แถบเลือกหน้า
          style={{ backgroundColor: '#e4e5e5' }}
          dataSource={warehousedata}
          columns={columns}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
        {/* <Modal
          title="แก้ไขสินค้า"
          visible={hisModalOpen}
          onOk={handleHisOk}
          onCancel={handleHisCancel}
        >
          {/* เพิ่มฟอร์มหรือเนื้อหาที่เกี่ยวข้องที่นี่ */}
        
      </Card>
    </>
  );
};

export default Warehouse;