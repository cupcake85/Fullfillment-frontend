import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Table, Input, Divider, Form, InputNumber, Layout } from 'antd';
import '../warehouse.css';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';
import { CloseCircleFilled, ContainerFilled, FolderFilled, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  sku: string;
  name: string;
  stores: string;
  details: string;
  quantity: number;
}

const Warehouse = () => {
  const [warehousedata, setWarehouse] = useState([]);
  const [addModal, setAddmodal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]); // เพิ่ม state เก็บข้อมูลที่เลือกไว้
  
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState<{ type: TTypeModal; item?: any}>



  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalHistory, setIsModalHistory] = useState(false);
  const [historyId, setHistoryId] = useState();
  const [getHistory, setHistory] = useState([]);
  const [editData, setEditData] = useState();

  const showModal = () => { setIsModalVisible(true); };
  const handleCancel = () => { setIsModalVisible(false) };
  const showAddModal = () => { setAddmodal(true); };
  const addCancel = () => { setAddmodal(false) };
  const showModalh = () => { setIsModalHistory(true); };
  const handleCancelh = () => { setIsModalHistory(false); };
  const clickManage = () => { showAddModal() };

  useEffect(() => { getWarehouse(); }, []);

  const warehouseColumns = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: 'SKU',
      dataIndex: 'sku', //ชื่อ dataIndex ตรงกับชื่อ field ใน dataSource
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
      title: 'ร้านค้า',
      dataIndex: 'stores', //key
      render: (value: any, record: any) => { //record คือ ทั้งแถว
        return <p>{value?.name}</p> //value คือ เลือกเฉพาะ key ที่สนใจแล้วตามด้วยชื่อข้อมูลที่ต้องการมาแสดง
      }
    },
    {
      title: 'คงเหลือ',
      key: 'quantity',
      dataIndex: 'quantity'
    },
    {
      title: '',
      render: (value: any, record: any) => {
        // console.log('value ที่ได้รับคือ: ',value);
        return <div>
          <Button onClick={() => editClick(value)} style={{ backgroundColor: '#3B4248', color: 'white' }}>แก้ไข</Button>
          <Button onClick={() => historyClick(value)} style={{ backgroundColor: 'white', }}>ประวัติ</Button>
        </div>
      }
    },

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
      title: "วันที่",
      dataIndex: "outDate",
    },
    {
      title: "ปริมาณ",
      dataIndex: "quantity",
    },

    {
      title: "บันทึก",
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
    console.log('เรียกรายการสินค้าทั้งหมดจาก item', request)
    setWarehouse(sortedData)
  }

  const editClick = (value: any) => {
    console.log('value จากการคลิกคือ ', value)
    showModal()
    form.setFieldsValue({ //เซ็ทจาก value ในตารางที่เก็บมา
      id: value.id,
      sku: value.sku,
      quantity: value.quantity
    })
  };

  const editSubmit = () => {
    const formData = form.getFieldsValue(['id', 'quantityEdit']); //รับค่าที่กรอกในฟอร์มจากฟิลด์ที่กำหนดไว้
    updateWarehouse(formData); // เรียกใช้ updateWarehouse() โดยส่งข้อมูล id และ formData เพื่ออัปเดตข้อมูลในคลังสินค้า
    setIsModalVisible(false);
  }

  const updateWarehouse = async ( formData: any) => {
    const body = {
      item: formData.id, //เลือกว่าจะเอาข้อมูลไหนจาก formData
      quantity: Number(formData.quantityEdit)
    }
    try {
      const request = await axios.post('http://192.168.2.57:3000/history/', body);
      console.log('post history', request);
      getWarehouse(); // เมื่อทำการส่งข้อมูลสำเร็จ ให้ดึงข้อมูลคลังสินค้าใหม่
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
    }
  }

  //คลิปกปุ่มแสดง modal ประวัติ
  const historyClick = (value: any) => {
    showModalh();
    history(value.id); //เรียกฟังก์ชัน History ด้วย property id ของพารามิเตอร์ value
    console.log('sku ของ history ที่กด', value.sku)
  };

  const history = async (id: number) => {
    try {
      const request = await axios.get("http://192.168.2.57:3000/history/");
      //กรองข้อมูลที่ได้รับมาตามเงื่อนไขที่ item.id ตรงกับพารามิเตอร์ id, 
      const history = request.data.data.filter((item: any) => {
        return item?.item?.id === id; //item อาจมี id หรือไม่ก็ได้ จึงเช็ค null ด้วย ?.
      })

      setHistory(history); //เรียกใช้ setHistory เพื่อทำการตั้งค่า state ของ component โดยให้เป็นค่าของ history
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
    <Layout>
      {/* <ContainerFilled /> */}
      <Card
        title= { 
          <span>
            <ContainerFilled style={{marginRight: 8}}/>
            คลังสินค้า
          </span>}
        bordered={false}
        style={{
          backgroundColor: 'white',
          margin: 65,
          borderRadius: 20,
        }}>

        <div >
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => clickManage()}
            style={{ backgroundColor: '#979A9C', color: 'white', borderRadius: '17px', marginBottom: '15px', }}>
            จัดการเพิ่ม/ลด
          </Button>
        </div>

        <Table
          rowSelection={rowSelection}
          rowKey={"id"} //ใช้ id แยกข้อมูลที่มาจาก array แล้ว
          pagination={{ defaultCurrent: 1 }}
          style={{ backgroundColor: '#e4e5e5', }}
          dataSource={warehousedata}
          columns={warehouseColumns}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
      </Card>

      <Modal title="แก้ไขสินค้า" open={isModalVisible} footer={null} onCancel={handleCancel} style={{width:"500px"}}>
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
            name="quantityEdit"
            rules={[{ required: true, message: '+100' }]}
          >
            <Input
              type='number'
              placeholder='+/-100'
              style={{ borderRadius: 100, border: 'solid 0.5px grey' }}
            />
          </Form.Item>
          <div style={{ textAlign: 'center', }}>
            <Button icon={<FolderFilled />} onClick={editSubmit} style={{ backgroundColor: '#bc211c', margin: 10, color: 'white', borderRadius: 100 }}>บันทึก</Button>
            <Button icon={<CloseCircleFilled />} onClick={handleCancel} style={{ backgroundColor: '#2F353A', color: 'white', borderRadius: 100 }}>ยกเลิก</Button>
          </div>
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
        title={"รหัส SKU"}
        open={isModalHistory}
        onCancel={handleCancelh}
        footer={null}
      >
        <Table
          style={{ backgroundColor: "#e4e5e5" }}
          dataSource={getHistory}
          columns={columnh}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
      </Modal>

    </Layout>
  );
};

export default Warehouse;