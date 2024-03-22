import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Table, Input, Divider, Form, InputNumber } from 'antd';
import '../warehouse.css';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';
import ItemInput from "../components/plus-modal";

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
  const showModalh = () => {
    setIsModalHistory(true);
  };
  const handleCancelh = () => {
    setIsModalHistory(false);
  };


  useEffect(() => {
    getWarehouse();
  }, []);

  // const data: DataType[] = [
  //   {
  //     key: '1',
  //     sku: 'John Brown',
  //     name: 'John Brown',
  //     details: 'New York No. 1 Lake Park',
  //     quantity: 100,
  //   },
  //   {
  //     key: '1',
  //     sku: 'John Brown',
  //     name: 'John Brown',
  //     details: 'New York No. 1 Lake Park',
  //     quantity: 100,
  //   },
  //   {
  //     key: '1',
  //     sku: 'John Brown',
  //     name: 'John Brown',
  //     details: 'New York No. 1 Lake Park',
  //     quantity: 100,
  //   },
  // ]


  const columns = [
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
      title: 'Action',
      render: (value: any, record: any) => {
        console.log(value);

        return <div>
          <Button onClick={() => onClick(value)}>แก้ไข</Button>
          <Button onClick={() => historyClick(value)}>ประวัติ</Button>
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
    // setWarehouse(request.data.data) ยังไม่ sort
    setWarehouse(sortedData)
  }

  const updateWarehouse = async (id: number, value: any) => {
    const request = await axios.put('http://192.168.2.57:3000/items/' + id, value)
    console.log('request put', request)
    getWarehouse();
  }

  function onokfunction() {
    const a = form.getFieldsValue(['id', 'sku', 'details', 'name', 'quantity'])
    updateWarehouse(a.id, a)
    setIsModalVisible(false) //ปิด Modal ทิ้ง
  }

  const onClick = (value: any) => {
    showModal()
    form.setFieldsValue({
      id: value.id,
      sku: value.sku,
      details: value.details,
      name: value.name,
      quantity: value.quantity
    })
  }

  const clickAdd = () => {
    showAddModal()
  };

  const historyClick = (value: any) => {
    showModalh();
    History(value.id)
  };


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRows(selectedRows); // เมื่อมีการเลือกแถวใหม่ให้เซ็ตค่า state
    }
  };

  const History = async (id: number) => {
    try {
      const request = await axios.get("http://192.168.2.57:3000/history/");
      // setHistory(request.data.data);
      const history = request.data.data.filter((item: any) => {
        return item.item.id === id
      })
      setHistory(history)

      console.log(history);
    } catch (err) {
      console.log(err);
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
          borderRadius: 20
        }}>
        <div >
          <Button onClick={() => clickAdd()}
            style={{ backgroundColor: '#979a9c', color: 'white', borderRadius: '17px', marginBottom: '15px' }}
          >เพิ่ม</Button>{' '}
          <Button style={{ backgroundColor: '#979a9c', color: 'white', borderRadius: '17px', marginBottom: '15px' }}>ลด</Button>
        </div>

        <Divider />

        <Table
          rowSelection={rowSelection}
          rowKey={"id"} //ใช้ id แยกข้อมูลที่มาจาก array แล้ว
          pagination={{ defaultCurrent: 1 }} //แถบเลือกหน้า
          style={{ backgroundColor: '#e4e5e5' }}
          dataSource={warehousedata}
          // dataSource={data}
          columns={columns}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
      </Card>

      <Modal title="แก้ไขสินค้า" open={isModalVisible} onOk={onokfunction} onCancel={handleCancel}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item
            name="id" hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="name"
            name="name"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="SKU"
            name="sku"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Detail"
            name="details"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input your quantity!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="จัดการสินค้า" open={addModal} onCancel={addCancel} footer={null} >
        <Table
          style={{ backgroundColor: '#e4e5e5' }}
          columns={addColumns}
          dataSource={selectedRows}
        />
      </Modal>

      <Modal
        title="Basic Modal"
        open={isModalHistory}
        onOk={onokfunction}
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