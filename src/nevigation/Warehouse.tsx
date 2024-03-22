import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Table, Input, Divider, Form } from "antd";
import "../warehouse.css";
import axios from "axios";
import { useForm } from "antd/es/form/Form";

type FieldType = {
  username?: string;
  quantity?: string;
  remember?: string;
};

interface DataType {
  key: React.Key;
  sku: string;
  name: string;
  detail: string;
  store: string;
  storage: string;
  quantity: number;
}

const Warehouse = () => {
  const [warehousedata, setWarehouse] = useState([]);
  const [getHistory, setHistory] = useState([]);
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalHistory, setIsModalHistory] = useState(false);
  const [historyId, setHistoryId] = useState();

  
  const [form] = useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalh = () => {
    setIsModalHistory(true);
  };
  const handleCancelh = () => {
    setIsModalHistory(false);
  };


  useEffect(() => {
    getWarehouse();
  }, []);
  /////////////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////////////////
  const columns = [
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
    },
    {
      title: "รายละเอียด",
      dataIndex: "details",
    },
    {
      title: "คงเหลือ",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Action",
      render: (value: any, record: any) => {
        // console.log(value);

        return (
          <div>
            <Button onClick={() => onClick(value)}>แก้ไข</Button>
            <Button onClick={() => historyClick(value)}>ประวัติ</Button>
          </div>
        );
      },
    },
  ];

  const rowSelection = {
    type: selectionType,
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      name: record.name,
    }),
  };

  const getWarehouse = async () => {
    const request = await axios.get("http://192.168.2.57:3000/items/");
    console.log("request", request);
    setWarehouse(request.data.data);
  };

  const updateWarehouse = async (id: number, value: any) => {
    const request = await axios.put("http://192.168.2.57:3000/items/" + id,value);
    console.log("request", request);
    getWarehouse();
  };
  ////////////////////////////////////////lllllllllll/////////////////////////////////////////////////////////////////
  const History = async (id: number) => {
    try {
      const request = await axios.get("http://192.168.2.57:3000/history/");
      // setHistory(request.data.data);
      const history = request.data.data.filter((item: any) => {
        return  item.item.id === id})
        setHistory(history)

      console.log(history);
    } catch (err) {
      console.log(err);
    }
  };

  //////////////////////////////////////////////llllllllllllllllll//////////////////////////////////////////////

  function onokfunction() {
    const a = form.getFieldsValue(["id", "quantity"]);
    updateWarehouse(a.id, a);
    setIsModalVisible(false); //ปิด Modal ทิ้ง
  }

  const onClick = (value: any) => {
    showModal();
    form.setFieldsValue({
      id: value.id,
      sku: value.sku,
      details: value.details,
      name: value.name,
      quantity: value.quantity,
    });
  };
  /////////////////////////////////////////////////////////////////////////////////////////
  const historyClick = (value: any) => {
    showModalh();
    History(value.id)
  };


  // //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Card
        title="คลังสินค้า"
        bordered={false}
        style={{
          backgroundColor: "white",
          margin: 65,
          borderRadius: 20,
        }}
      >
        <div>
          <Button
            style={{
              backgroundColor: "#979a9c",
              color: "white",
              borderRadius: "17px",
              marginBottom: "15px",
            }}
          >
            เพิ่ม
          </Button>{" "}
          <Button
            style={{
              backgroundColor: "#979a9c",
              color: "white",
              borderRadius: "17px",
              marginBottom: "15px",
            }}
          >
            ลด
          </Button>
        </div>

        <Divider />

        <Table
          rowSelection={rowSelection}
          pagination={{ defaultCurrent: 1 }} //แถบเลือกหน้า
          style={{ backgroundColor: "#e4e5e5" }}
          dataSource={warehousedata}
          // dataSource={data}
          columns={columns}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />

      </Card>

      <Modal
        title="Basic Modal"
        open={isModalVisible}
        onOk={onokfunction}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="name" name="name">
            <Input disabled />
          </Form.Item>
          <Form.Item label="order" name="order">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Detail" name="details">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input your quantity!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    {/* --------------------------------------------------------------------------------- */}
      <Modal
        title="Basic Modal"
        open={isModalHistory}
        onOk={onokfunction}
        onCancel={handleCancelh}
      >
       <Table
          pagination={{ defaultCurrent: 1 }} //แถบเลือกหน้า
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
