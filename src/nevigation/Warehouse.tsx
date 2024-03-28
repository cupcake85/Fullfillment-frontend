import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Table, InputNumber } from "antd";
import "../warehouse.css";
import axios from "axios";

import { PlusCircleOutlined } from "@ant-design/icons";
import ModalWarehouse, { TTypeModal } from "../component/warehouse/modal";

interface DataType {
  key: React.Key;
  sku: string;
  name: string;
  details: string;
  quantity: number;
}

const Warehouse = () => {
  const [warehousedata, setWarehouse] = useState([]);
  const [addModal, setAddmodal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]); // เพิ่ม state เก็บข้อมูลที่เลือกไว้

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<{ type: TTypeModal; item?: any }>({
    type: "edit",
  });

  const showAddModal = () => {
    setAddmodal(true);
  };
  const addCancel = () => {
    setAddmodal(false);
  };

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getWarehouse();
  }, []);

  const warehouseColumns = [
    {
      title: "#",
      dataIndex: "id",
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
      title: "",
      key: "data",
      render: (value: any, record: any) => {
        // console.log(value);
        return (
          <div>
            <Button
              onClick={() => editClick(record)}
              style={{ backgroundColor: "#3B4248", color: "white" }}
            >
              แก้ไข
            </Button>
            <Button
              onClick={() => historyClick(record)}
              style={{ backgroundColor: "white" }}
            >
              ประวัติ
            </Button>
          </div>
        );
      },
    },
  ];

  const addColumns = [
    {
      title: "#",
      dataIndex: "id",
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
      tilte: "เพิ่ม/ลด",
      render: (value: any, record: any) => {
        let quantity = record.quantity;
        return (
          <InputNumber
            value={quantity}
            onChange={(value) => (quantity = value)}
          />
        );
      },
    },
  ];

  const getWarehouse = async () => {
    const request = await axios.get("http://192.168.2.57:3000/items/");
    const sortedData = request.data.data.sort((a: any, b: any) => {
      // เรียงลำดับตาม id จากน้อยไปหามาก
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    console.log("request get", request);
    setWarehouse(sortedData);
  };

  const updateWarehouse = async (id: number, formData: any) => {
    try {
      const request = await axios.post(
        "http://192.168.2.57:3000/history/" + id,
        formData
      );
      console.log("request post", request);
      getWarehouse(); // เมื่อทำการส่งข้อมูลสำเร็จ ให้ดึงข้อมูลคลังสินค้าใหม่
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    }
  };

  const editClick = (value: any) => {
    setValue({ type: "edit", item: value });
    toggle();
  };

  const clickAdd = () => {
    showAddModal();
  };

  const historyClick = (value: any) => {
    setValue({ type: "history", item: value });
    toggle();
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRows(selectedRows); // เมื่อมีการเลือกแถวใหม่ให้เซ็ตค่า state
    },
  };

  return (
    <>
      <ModalWarehouse
        open={open}
        onClose={toggle}
        updateWarehouse={updateWarehouse}
        type={value.type}
        item={value.item}
      />
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
            icon={<PlusCircleOutlined />}
            onClick={() => clickAdd()}
            style={{
              backgroundColor: "#979A9C",
              color: "white",
              borderRadius: "17px",
              marginBottom: "15px",
            }}
          >
            จัดการเพิ่ม/ลด
          </Button>
        </div>

        <Table
          rowSelection={rowSelection}
          rowKey={"id"} //ใช้ id แยกข้อมูลที่มาจาก array แล้ว
          pagination={{ defaultCurrent: 1 }}
          style={{ backgroundColor: "#e4e5e5" }}
          dataSource={warehousedata}
          columns={warehouseColumns}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
      </Card>

      <Modal
        title="จัดการสินค้า"
        open={addModal}
        onCancel={addCancel}
        footer={null}
      >
        <Table
          style={{ backgroundColor: "#e4e5e5" }}
          columns={addColumns}
          dataSource={selectedRows}
          pagination={{ defaultCurrent: 1, total: 50 }}
        />
      </Modal>
    </>
  );
};

export default Warehouse;
