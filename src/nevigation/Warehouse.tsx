import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Table, Input, Divider, Form, InputNumber } from 'antd';
import '../warehouse.css';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';
import { CloseCircleFilled, FolderFilled, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

type FieldType = {
  username?: string;
  quantity?: string;
  remember?: string;
};

interface DataType {
  key: React.Key;
  sku: string;
  name: string;
  details: string;
  quantity: number;
}

const Warehouse = () => {
  const [warehousedata, setWarehouse] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addModal, setAddmodal] = useState(false);
  const [form] = useForm();
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]); // เพิ่ม state เก็บข้อมูลที่เลือกไว้
  const [isModalHistory, setIsModalHistory] = useState(false);
  const [historyId, setHistoryId] = useState();
  const [getHistory, setHistory] = useState([]);

  const showModal = () => { setIsModalVisible(true); };
  const handleCancel = () => { setIsModalVisible(false) };
  const showAddModal = () => { setAddmodal(true); };
  const addCancel = () => { setAddmodal(false) };
  const showModalh = () => { setIsModalHistory(true); };
  const handleCancelh = () => { setIsModalHistory(false); };

  useEffect(() => { getWarehouse(); }, []);

  const warehouseColumns = [
    {
      title: '#',
      dataIndex: 'id',
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
      dataIndex: 'details',
    },
    {
      title: 'คงเหลือ',
      key: 'quantity',
      dataIndex: 'quantity'
    },
    {
      title: '',
      render: (value: any, record: any) => {
        console.log(value);
        return <div>
          <Button onClick={() => editClick(value)} style={{backgroundColor:'#3B4248', color:'white'}}>แก้ไข</Button>
          <Button onClick={() => historyClick(value)} style={{backgroundColor:'white', }}>ประวัติ</Button>
        </div>
      }
    }
  ];

  const addColumns = [
    {
      title: '#',
      dataIndex: 'id',
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
      dataIndex: 'details',
    },
    {
      title: 'คงเหลือ',
      key: 'quantity',
      dataIndex: 'quantity'
    },
    {
      tilte: 'เพิ่ม/ลด',
      render: (value: any, record: any) => {
        let quantity = record.quantity
        return <InputNumber
          value={quantity}
          onChange={(value) => quantity = value} />
      }
    }
  ];

  const columnh = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "ชื่อสินค้า",
      dataIndex: "note",
    },
    {
      title: "Date",
      dataIndex: "outDate",
    },
    {
      title: "รายละเอียด",
      dataIndex: "remark",
    },
    {
      title: "คงเหลือ",
      key: "quantity",
      dataIndex: "quantity",
    },
  ];

  const getWarehouse = async () => {
    const request = await axios.get('http://192.168.2.57:3000/items/')
    const sortedData = request.data.data.sort((a: any, b: any) => {
      // เรียงลำดับตาม id จากน้อยไปหามาก
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    console.log('request get', request)
    setWarehouse(sortedData)
  }
  // http://192.168.2.57:3000/history/{:id}

  function editOk() {
    const formData = form.getFieldsValue(['id', 'sku', 'details', 'name', 'quantity']); //รับค่าที่กรอกในฟอร์มจากฟิลด์ที่กำหนดไว้
    updateWarehouse(formData.id, formData); // เรียกใช้ updateWarehouse() โดยส่งข้อมูล id และ formData เพื่ออัปเดตข้อมูลในคลังสินค้า
    setIsModalVisible(false);
  }

  const updateWarehouse = async (id: number, formData: any) => {
    try {
      const request = await axios.post('http://192.168.2.57:3000/history/' + id, formData);
      console.log('request post', request);
      getWarehouse(); // เมื่อทำการส่งข้อมูลสำเร็จ ให้ดึงข้อมูลคลังสินค้าใหม่
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
    }
  }

  const editClick = (value: any) => {
    showModal()
    form.setFieldsValue({
      id: value.id,
      sku: value.sku,
      // details: value.details,
      // name: value.name,
      quantity: value.quantity
    })
  };

  const clickAdd = () => {
    showAddModal()
  };

  const historyClick = (value: any) => {
    showModalh();
    History(value.id)
  };

  const History = async (id: number) => {
    try {
      const request = await axios.get("http://192.168.2.57:3000/history/");
      const history = request.data.data.filter((item: any) => {
        console.log('ไอเท็ม', item, id)
        return item?.item?.id === id //เช็ค null
      })
      setHistory(history)
    } catch (err) {
      console.log(err);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRows(selectedRows); // เมื่อมีการเลือกแถวใหม่ให้เซ็ตค่า state
    }
  };

  return (
    <>

      <Card
        title='คลังสินค้า'
        bordered={false}
        style={{
          backgroundColor: 'white',
          margin: 65,
          borderRadius: 20,
        }}>
        <div >
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => clickAdd()}
            style={{ backgroundColor: '#979A9C', color: 'white', borderRadius: '17px', marginBottom: '15px',}}>
            จัดการเพิ่ม/ลด
          </Button>
        </div>

        <Table
          rowSelection={rowSelection}
          rowKey={"id"} //ใช้ id แยกข้อมูลที่มาจาก array แล้ว
          pagination={{ defaultCurrent: 1 }}
          style={{ backgroundColor: '#e4e5e5' ,}}
          dataSource={warehousedata}
          columns={warehouseColumns}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
      </Card>

      <Modal title="แก้ไขสินค้า" open={isModalVisible} footer={null} onCancel={handleCancel}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, }}
          autoComplete="off"
        >
          <Form.Item
            name="id" hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SKU"
            name="sku"
          >
            <Input disabled style={{ borderRadius: 100, border: 'solid 0.5px grey' }} />
          </Form.Item>

          <Form.Item
            label="สินค้าคงเหลือ"
            name="quantity"
          >
            <Input disabled style={{ borderRadius: 100, border: 'solid 0.5px grey' }} />
          </Form.Item>
          <Form.Item
            label="เพิ่มลดสินค้า"
            rules={[{ required: true, message: '+100' }]}
          >
            <Input type='number' placeholder='+/-100' style={{ borderRadius: 100, border: 'solid 0.5px grey' }} />
          </Form.Item>
          <div style={{ textAlign: 'center', }}>
            <Button icon={<FolderFilled />} onClick={editOk} style={{ backgroundColor: '#bc211c', margin: 10, color: 'white', borderRadius: 100 }}>บันทึก</Button>
            <Button icon={<CloseCircleFilled />} onClick={handleCancel} style={{ backgroundColor: '#2F353A', color: 'white', borderRadius: 100 }}>ยกเลิก</Button>
          </div>
        </Form>
      </Modal>

      <Modal title="จัดการสินค้า" open={addModal} onCancel={addCancel} footer={null} >
        <Table
          style={{ backgroundColor: '#e4e5e5' }}
          columns={addColumns}
          dataSource={selectedRows}
          pagination={{defaultCurrent: 1, total:50}}
        />
      </Modal>

      <Modal
        title="Basic Modal"
        open={isModalHistory}
        // onOk={onokfunction}
        onCancel={handleCancelh}
        footer={null}
      >
        <Table
          // pagination={{ defaultCurrent: 1 }}
          style={{ backgroundColor: "#e4e5e5" }}
          dataSource={getHistory}
          columns={columnh}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
      </Modal>

    </>
  );
};

export default Warehouse;