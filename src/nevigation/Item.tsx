import React, { useState } from "react";
import {
  Button,
  ConfigProviderProps,
  Row,
  Col,
  Card,
  Modal,
  TableColumnsType,
  Table,
  Space,
  Input,
  Form,
} from "antd";
import {
  DeleteFilled,
  FileAddFilled,
  PlusCircleFilled,
  ProfileFilled,
} from "@ant-design/icons";
import ItemInput from "../component/item-input";
import form from "antd/es/form";

const Item = () => {
  //------------------------------------------------------------Table----------------------------------------------------------------------------------------
  interface DataType {
    key: React.Key;
    sku: string;
    name: string;
    shop: string;
    note: string;
  }

  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );

  const columns: TableColumnsType<DataType> = [
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
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "ร้านค้า",
      dataIndex: "shop",
    },
    {
      title: "หมายเหตุ",
      dataIndex: "note",
    },
    //------------------------------------------------------------edit modal----------------------------------------------------------------------------------------
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Col>
            <Button
              onClick={showModal}
              size="small"
              style={{
                width: 60,
                backgroundColor: "#262626",
                color: "#ffffff",
              }}
            >
              Edit
            </Button>
            <Button size="small" style={{ width: 60 }}>
              Delete
            </Button>
          </Col>
          <Modal
            title="จัดการสินค้า"
            open={isModalOpen}
            centered
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            ></Form>
          </Modal>
        </Space>
      ),
    },
    //------------------------------------------------------------edit modal----------------------------------------------------------------------------------------
  ];

  const data: DataType[] = [
    {
      key: "1",
      sku: "",
      name: "",
      shop: "",
      note: "",
    },
    {
      key: "2",
      sku: "",
      name: "",
      shop: "",
      note: "",
    },
    {
      key: "3",
      sku: "",
      name: "",
      shop: "",
      note: "",
    },
    {
      key: "4",
      sku: "",
      name: "",
      shop: "",
      note: "",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };
  //------------------------------------------------------------Table----------------------------------------------------------------------------------------
  //------------------------------------------------------------Modal----------------------------------------------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalAdd = () => {
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
  const [form] = Form.useForm();
  //------------------------------------------------------------Modal----------------------------------------------------------------------------------------

  type SizeType = ConfigProviderProps["componentSize"];

  const [size, setSize] = useState<SizeType>("large");

  return (
    <div>
      <Row justify="center" align="middle">
        <Card bordered={false} style={{ width: 1000, height: 650, margin: 12 }}>
          {/* ---------------------------------------------------------------------------head-------------------------------------------------------------------------- */}
          <Row
            justify="center"
            align="middle"
            style={{ backgroundColor: "#f0f0f0" }}
          >
            <Col span={20}>
              <Row justify="space-between" align="middle">
                <Col
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    fontSize: "40px",
                    color: "#262626",
                  }}
                >
                  <ProfileFilled /> จัดการ
                </Col>
              </Row>
            </Col>
          </Row>
          {/* ---------------------------------------------------------------------------head-------------------------------------------------------------------------- */}

          {/* ---------------------------------------------------------------------------content-------------------------------------------------------------------------- */}
          <Row justify="end">
            <Col style={{ margin: 10 }}>
              <Button
                style={{ backgroundColor: "#262626" }}
                type="primary"
                shape="round"
                icon={<DeleteFilled />}
                size={size}
              >
                ลบ
              </Button>{" "}
              <Button
                style={{ backgroundColor: "#262626" }}
                type="primary"
                shape="round"
                icon={<PlusCircleFilled />}
                size={size}
                onClick={showModalAdd}
              >
                สินค้า
              </Button>
              {/* ---------------------------------------------------------------------------modal-------------------------------------------------------------------------- */}
              <Modal
                title="เพิ่มสินค้า"
                open={isModalOpenAdd}
                centered
                onOk={handleOkAdd}
                onCancel={handleCancelAdd}
                footer={null}
                width={600}
              >
                <ItemInput form={form} handleCancel={handleCancel}></ItemInput>
              </Modal>
              {/* ---------------------------------------------------------------------------Modal-------------------------------------------------------------------------- */}
            </Col>
          </Row>
          {/* ---------------------------------------------------------------------------Table-------------------------------------------------------------------------- */}
          <Row justify="center">
            <Col span={20}>
              <br></br>
              <Table
                rowSelection={{
                  type: selectionType,
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                pagination={{ defaultCurrent: 1, total: 500 }}
                scroll={{ x: 400, y: 350 }}
              />
            </Col>
          </Row>
          {/* ---------------------------------------------------------------------------Table-------------------------------------------------------------------------- */}
          {/* ---------------------------------------------------------------------------content-------------------------------------------------------------------------- */}
        </Card>
      </Row>
    </div>
  );
};

export default Item;
