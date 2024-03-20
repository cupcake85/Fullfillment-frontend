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
} from "antd";
import {
  DeleteFilled,
  FileAddFilled,
  PlusCircleFilled,
  ProfileFilled,
} from "@ant-design/icons";

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
            <Button onClick={showModal} size="middle" style={{width:100, backgroundColor: "#262626", color:"#ffffff"}}>Edit</Button>
            <Button size="middle" style={{width:100}}>Delete</Button>
          </Col>
          <Modal
            style={{ backgroundColor: "#40a9ff" }}
            title="จัดการสินค้า"
            centered
            width={800}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Row align={"middle"}>
              <Col span={3}>
                <p>SKU</p>
              </Col>
              <Col>
                <Input></Input>
              </Col>
            </Row>
            <Row align={"middle"}>
              <Col span={3}>
                <p>ชื่อสินค้า</p>
              </Col>
              <Col>
                <Input></Input>
              </Col>
            </Row>
            <Row align={"middle"}>
              <Col span={3}>
                <p>หมายเหตุ</p>
              </Col>
              <Col>
                <Input></Input>
              </Col>
            </Row>
            <Row align={"middle"}>
              <Col span={3}>
                <p>ลูกค้า</p>
              </Col>
              <Col>
                <Input></Input>
              </Col>
            </Row>
            <Row align={"middle"}>
              <Col span={3}>
                <p>คำอธิบาย</p>
              </Col>
              <Col>
                <Input></Input>
              </Col>
            </Row>
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
    {
      key: "4",
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
    {
      key: "4",
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
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  //------------------------------------------------------------Modal----------------------------------------------------------------------------------------

  type SizeType = ConfigProviderProps["componentSize"];

  const [size, setSize] = useState<SizeType>("large");

  return (
    <div>
      <Row justify="center" align="middle">
        <Card bordered={false} style={{ width: 1000, height: 700, margin: 12 }}>
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
                onClick={showModal1}
              >
                สินค้า
              </Button>
              {/* ---------------------------------------------------------------------------modal-------------------------------------------------------------------------- */}
              <Modal
                title="เพิ่มสินค้า"
                open={isModalOpen1}
                onOk={handleOk1}
                onCancel={handleCancel1}
                width={600}
              >
                <Row style={{ fontSize: "20px" }}>
                  <FileAddFilled />
                  <p style={{ marginLeft: 10 }}>รายละเอียดสินค้า</p>
                </Row>
                <Row align={"middle"}>
                  <Col span={5}>
                    <p style={{ marginLeft: 30 }}>รหัสสินค้า</p>
                  </Col>
                  <Col>
                    <Input></Input>
                  </Col>
                </Row>
                <Row align={"middle"}>
                  <Col span={5}>
                    <p style={{ marginLeft: 30 }}>ชื่อสินค้า</p>
                  </Col>
                  <Col>
                    <Input></Input>
                  </Col>
                </Row>
                <Row align={"middle"}>
                  <Col span={5}>
                    <p style={{ marginLeft: 30 }}>หมวดหมู่</p>
                  </Col>
                  <Col>
                    <Input></Input>
                  </Col>
                </Row>
                <Row align={"middle"}>
                  <Col span={5}>
                    <p style={{ marginLeft: 30 }}>หน่วย</p>
                  </Col>
                  <Col>
                    <Input></Input>
                  </Col>
                </Row>
                <Row align={"middle"}>
                  <Col span={5}>
                    <p style={{ marginLeft: 30 }}>บาร์โค้ด</p>
                  </Col>
                  <Col>
                    <Input></Input>
                  </Col>
                </Row>
                <Row align={"middle"}>
                  <Col span={5}>
                    <p style={{ marginLeft: 30 }}>Tag สินค้า</p>
                  </Col>
                  <Col>
                    <Input></Input>
                  </Col>
                </Row>
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
                pagination={{ defaultCurrent: 6, total: 500 }}
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
