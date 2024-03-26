import { useState } from "react";
import { Layout, Menu, Button, theme, Card, Modal, Table } from "antd";

const Store = () => {
  const { Content } = Layout;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "ชื่อลูกค้า",
      dataIndex: "sku",
    },
    {
      title: "รหัสผู้จัดส่ง",
      dataIndex: "name",
    },
    {
      title: "ชื่อผู้จัดส่ง",
      dataIndex: "details",
    },
    {
      title: "รหัสไปรษณีย์ผู้จัดส่ง",

      dataIndex: "quantity",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "details",
    },
    {
        title: "อีเมล",
        dataIndex: "details",
      },
      {
        title: "จัดการ",
        dataIndex: "details",
      },
  ];

  

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
          backgroundColor: "gray",
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
        <Button type="primary" onClick={showModal}>
          เพิ่มผู้ใช้งาน
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          hello
        </Modal>

        <Table
          // pagination={{ defaultCurrent: 1 }}
          style={{ backgroundColor: "#e4e5e5" }}
          columns={columns}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
      </Content>
    </Layout>
  );
};

export default Store;
