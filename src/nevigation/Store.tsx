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
import EditStore from "../component/storeEdit";
import axios from "axios";
import { DeleteFilled, EditFilled, UserOutlined } from "@ant-design/icons";

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
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  

  useEffect(() => {
    getItemData();
  }, []);

  useEffect(() => {
    if (isReload) {
      getItemData();
    }
    setIsReload(false);
  }, [isReload]);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const showModalAdd = (value?: any) => {
    if (value) {
      form.setFieldsValue(value);
    }
    setIsModalOpenAdd(true);
  };
  const showModalEdit = () => {
    setIsModalEdit(true);
  };
  const cancelModalEdit = () => {
    setIsModalEdit(false);
  };

  const handleOkEdit = () => {
    setIsModalOpenEdit(true);
  };
  const handleCancelEdit = () => {
    setIsModalOpenEdit(true);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const editClick = (value: any) => {
    showModalEdit();
    form.setFieldsValue({
      name: value.name,
      shipperCode: value.shipperCode,
      shipperName: value.shipperName,
      zipCode: value.zipCode,
      phoneNumber: value.phoneNumber,
      email: value.email,
    });
  };

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
            <div>
              <Button onClick={() => editClick(value)}>
                <EditFilled />
              </Button>
            </div>
            <div>
            <Button onClick={() => deleteStore(value)}>
              <DeleteFilled />
            </Button>
            </div>
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
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          <UserOutlined /> ผู้ใช้งาน
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
          <InputStore
            form={form}
            handleCancel={handleCancelAdd}
            setIsReload={setIsReload}
          ></InputStore>
        </Modal>

        <Modal
          title="แก้ไข"
          open={isModalEdit}
          onCancel={cancelModalEdit}
          footer={null}
        >
          <EditStore
            form={form}
            handleCancelEdit={cancelModalEdit}
            setIsReload={setIsReload}
          ></EditStore>
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
