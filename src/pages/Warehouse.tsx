import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Table, Input, Divider, Form, InputNumber, Layout, Alert } from 'antd';
import '../warehouse.css';
import axios, { AxiosResponse } from 'axios';
import { useForm } from 'antd/es/form/Form';
import { CloseCircleFilled, ContainerFilled, FolderFilled, PlusCircleOutlined } from '@ant-design/icons';
import { TTypeModal } from '../component/warehouse/modal';
import dayjs from "dayjs";
import { IResult, Iitem } from '../interface/item.interface';

const Warehouse = () => {
  const [warehousedata, setWarehouse] = useState<Iitem[]>([]);
  const [addModal, setAddmodal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Iitem[]>([]); // เพิ่ม state เก็บข้อมูลที่เลือกไว้

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<{ type: TTypeModal; item?: any }>({ type: "edit", });

  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalHistory, setIsModalHistory] = useState(false);
  const [getHistory, setHistory] = useState([]);
  const [sku, setSku] = useState();

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
        return <Form.Item name={record.id}
          initialValue={0}>
          <InputNumber />
        </Form.Item>

      }
    }
  ];

  const columnHistory = [
    {
      title: "วันที่",
      dataIndex: "outDate",
      render: (rc:any) => {
        const date = dayjs(rc.outDate).format("DD/MM/YYYY HH:mm");
        return <>{date}</>;
      },
    },
    {
      title: "ปริมาณ",
      dataIndex: "quantity",
    },

    {
      title: "บันทึก",
      dataIndex: "remark",
    },
  ];

  const retrieveAllItems = async (): Promise<AxiosResponse<IResult<Iitem[]>>> => {
    const request: AxiosResponse<IResult<Iitem[]>> = await axios.get('http://192.168.2.57:3000/items/');
    console.log("🚀 ~ retrieveAllItems ~ request:", request)
    return request;
};

  const getWarehouse = async () => {
    const request = await retrieveAllItems()
    setWarehouse(request.data.data)
  }

  const editClick = (value: any) => {
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
    form.resetFields();
    setIsModalVisible(false);
  }

  const updateWarehouse = async (formData: any) => {
    const body = {
      item: formData.id, //เลือกว่าจะเอาข้อมูลไหนจาก formData
      quantity: Number(formData.quantityEdit)
    }
    try {
      await axios.put('http://192.168.2.57:3000/items/update-quantity', body);
      getWarehouse(); // เมื่อทำการส่งข้อมูลสำเร็จ ให้ดึงข้อมูลคลังสินค้าใหม่
    } catch (error: any) {
      alert(error?.response?.data.message)
    }
  }

  //คลิปกปุ่มแสดง modal ประวัติ
  const historyClick = (value: any) => {
    showModalh();
    history(value.id);
    setSku(value.sku)
  };

  const history = async (id: number) => {
    try {
      const request = await axios.get("http://192.168.2.57:3000/history/" + id);
      console.log('เป็นอะไร -> ', request)
      setHistory(request.data.data); //data.data => data แรกคือ data จาก axios, data ที่สองคือ data จากหลังบ้าน
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: Iitem[]) => { //onChange เอาไปใช้ใน table ได้เลย
      setSelectedRows(selectedRows); // เมื่อมีการเลือกแถวใหม่ให้เซ็ตค่า state
    }
  };

  const multipleSubmit = (rowValue: any) => {
    console.log('rowValue ได้อะไร -> ', rowValue)
    const rowData = selectedRows.map((item: any) => {
      return {item:item.id, quantity:rowValue[item.id] }
      
    }); console.log("Rowdata ได้อะไร -> ",rowData)
    updateMultiple(rowData);
    setAddmodal(false);
  }

  const updateMultiple = async (selectedRows: any) => {
    try {
      await axios.put("http://192.168.2.57:3000/items/update-quantity-multiple", selectedRows);
      getWarehouse();
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  }


  return (
    <Layout
    >
      {/* <ContainerFilled /> */}
      <Card
        title={
          <span>
            <ContainerFilled style={{ marginRight: 8 }} />
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

      <Modal title="แก้ไขสินค้า" open={isModalVisible} footer={null} onCancel={handleCancel} style={{ width: "500px" }}>
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
            rules={[{ required: true, message: '*โปรดกรอกจำนวนที่ต้องการ' }]}
          >
            <Input
              type='number'
              placeholder='Ex. 100/-100'
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
        <Form form={form} onFinish={multipleSubmit}>
          <Table
            style={{ backgroundColor: '#e4e5e5' }}
            columns={addColumns}
            dataSource={selectedRows}
            pagination={{ defaultCurrent: 1 }}
          />
          <div style={{ textAlign: 'center', }}>
            <Button htmlType='submit' icon={<FolderFilled />} style={{ backgroundColor: '#bc211c', margin: 10, color: 'white', borderRadius: 100 }}>บันทึก</Button>
            <Button icon={<CloseCircleFilled />} onClick={handleCancel} style={{ backgroundColor: '#2F353A', color: 'white', borderRadius: 100 }}>ยกเลิก</Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title={sku}
        open={isModalHistory}
        onCancel={handleCancelh}
        footer={null}
      >
        <Table
          style={{ backgroundColor: "#e4e5e5" }}
          dataSource={getHistory}
          columns={columnHistory}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
          pagination={{ defaultCurrent: 1 }}
        />
      </Modal>

    </Layout>
  );
};

export default Warehouse;