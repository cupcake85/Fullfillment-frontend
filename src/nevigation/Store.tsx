import React from "react";
import { useState, useEffect } from "react";
import {
  Layout,
  Form,
  Button,
  theme,
  Card,
  Modal,
  Table,
  Input,
  TableColumnsType,
} from "antd";
import type { FormItemProps } from "antd";
import { useForm } from "antd/es/form/Form";
import InputStore from "../component/storeInput";
import axios from "axios";

const Store = () => {
  interface DataType {
    name: string;
    shipperCode: string;
    shipperName: string;
    zipCode: string;
    phoneNumber: string;
    email: string;
  }

  const { Content } = Layout;
  const [itemData, setItemData] = useState([]);
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  useEffect(() => {
    getItemData();
  }, []);

  useEffect(() => {
    if (isReload) {
      getItemData();
    }
    setIsReload(false);
  }, [isReload]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalAdd = (value?: any) => {
    if (value) {
      form.setFieldsValue(value);
    }
    setIsModalOpenAdd(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  // const onClick = (value: any) => {
  //   showModal();
  //   form.setFieldsValue({
  //     id: value.id,
  //     sku: value.sku,
  //     details: value.details,
  //     name: value.name,
  //     quantity: value.quantity,
  //   });
  // };

  const editClick = (value: any) => {
    showModal();
    form.setFieldsValue({
      name: value.name,
      shipperCode: value.shipperCode,
      shipperName: value.shipperName,
      zipCode: value.zipCode,
      phoneNumber: value.phoneNumber,
      email: value.email,
    });
  };
  const historyClick = (value: any) => {};

  const columns: TableColumnsType<DataType> = [
    {
      title: "ชื่อลูกค้า",
      dataIndex: "name",
    },
    {
      title: "รหัสผู้จัดส่ง",
      dataIndex: "shipperCode",
    },
    {
      title: "ชื่อผู้จัดส่ง",
      dataIndex: "shipperName",
    },
    {
      title: "รหัสไปรษณีย์ผู้จัดส่ง",
      dataIndex: "zipCode",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "phoneNumber",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
    },
    {
      title: "จัดการ",
      render: (value: any, record: any) => {
        console.log(value);
        return (
          <div>
            <Button onClick={() => editClick(value)}>แก้ไข</Button>
            <Button onClick={() => deleteStore(value)}>ลบ</Button>
          </div>
        );
      },
    },
  ];

  const getItemData = async () => {
    const request = await axios.get("http://192.168.2.57:3000/stores/");
    const sortedData = request.data.data.sort((a: any, b: any) => {
      // เรียงลำดับตาม id จากน้อยไปหามาก
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    setItemData(sortedData);
  };

  const deleteStore = async (value: any) => {
    await axios.delete("http://192.168.2.57:3000/stores/" + value.id, value);
    setIsReload(true);
  };

  return (
    <Layout
      style={{
        margin: "15px 80px",
        padding: 10,
        minHeight: 220,
      }}
    >
      <Content
        style={{
          margin: "15px 10px",
          padding: 20,
          minHeight: 250,
          // backgroundColor: "pink",
        }}
      >
        <Card
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          ผู้ใช้งาน
        </Card>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            type="primary"
            onClick={showModalAdd}
            style={{ backgroundColor: "gray", marginTop: "15px" }}
          >
            เพิ่มผู้ใช้งาน
          </Button>
        </div>
        <Modal
          title="เพิ่มผู้ใช้งาน"
          open={isModalOpenAdd}
          onOk={handleOkAdd}
          onCancel={handleCancelAdd}
          footer={null}
        >
          <InputStore form={form} handleCancel={handleCancel} setIsReload={setIsReload}></InputStore>
        </Modal>

        <Table
          dataSource={itemData}
          style={{
            backgroundColor: "#e4e5e5",
            borderRadius: "15px",
            marginTop: "15px",
          }}
          columns={columns}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
      </Content>
    </Layout>
  );
};

export default Store;
