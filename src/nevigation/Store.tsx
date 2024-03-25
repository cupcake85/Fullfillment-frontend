import React from "react";
import { useState } from "react";
import { Layout, Form, Button, theme, Card, Modal, Table, Input } from "antd";
import type { FormItemProps } from "antd";
import { useForm } from "antd/es/form/Form";

const Store = () => {
  const { Content } = Layout;
  const [form] = useForm();
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
          title="เพิ่มผู้ใช้งาน"
          open={isModalOpen}
          onOk={handleOk}
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
            <Form.Item label="ชื่อลูกค้า" name="">
              <Input />
            </Form.Item>
            <Form.Item label="รหัสผู้จัดส่ง" name="">
              <Input />
            </Form.Item>
            <Form.Item label="ชื่อผู้จัดส่ง" name="">
              <Input />
            </Form.Item>
            <Form.Item label="รหัสไปรษณีย์" name="">
              <Input />
            </Form.Item>
            <Form.Item label="เบอร์โทร" name="">
              <Input />
            </Form.Item>
            <Form.Item label="อีเมล" name="">
              <Input />
            </Form.Item>
          </Form>
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
