import React, { useState } from "react";
import {
  Layout,
  Flex,
  Button,
  ConfigProviderProps,
  Row,
  Col,
  Table,
  TableColumnsType,
  Space,
  Modal,
  Form,
} from "antd";
import {
  DeleteFilled,
  DownloadOutlined,
  PlusCircleFilled,
  ProfileFilled,
} from "@ant-design/icons";
import ItemInput from "../componant/item-input";

const Item = () => {
  type SizeType = ConfigProviderProps["componentSize"];

  interface DataType {
    key: React.Key;
    sku: number;
    name: string;
    store: string;
    note: string;
  }

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

  const [size, setSize] = useState<SizeType>("large");

  const [selectionType, setSelectionType] = useState<"radio" | "checkbox">(
    "checkbox"
  );

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

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

  const [form] = Form.useForm();

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
      dataIndex: "store",
    },
    {
      title: "หมายเหตุ",
      dataIndex: "note",
    },
    {
      title: "",
      key: "action",
      // render: (_, record) => (
      //   // <Space size="middle">
      //   //   <Button onClick={showModal}>Edit</Button>
      //   //   <Modal
      //   //     style={{ backgroundColor: "#40a9ff" }}
      //   //     title="จัดการสินค้า"
      //   //     centered
      //   //     width={800}
      //   //     open={isModalOpen}
      //   //     onOk={handleOk}
      //   //     onCancel={handleCancel}
      //   //   >
      //   //     <Row align={"middle"}>
      //   //       <Col span={3}>
      //   //         <p>SKU</p>
      //   //       </Col>
      //   //       <Col>
      //   //         <input></input>
      //   //       </Col>
      //   //     </Row>
      //   //     <Row align={"middle"}>
      //   //       <Col span={3}>
      //   //         <p>ชื่อสินค้า</p>
      //   //       </Col>
      //   //       <Col>
      //   //         <input></input>
      //   //       </Col>
      //   //     </Row>
      //   //     <Row align={"middle"}>
      //   //       <Col span={3}>
      //   //         <p>หมายเหตุ</p>
      //   //       </Col>
      //   //       <Col>
      //   //         <input></input>
      //   //       </Col>
      //   //     </Row>
      //   //     <Row align={"middle"}>
      //   //       <Col span={3}>
      //   //         <p>ลูกค้า</p>
      //   //       </Col>
      //   //       <Col>
      //   //         <input></input>
      //   //       </Col>
      //   //     </Row>
      //   //     <Row align={"middle"}>
      //   //       <Col span={3}>
      //   //         <p>คำอธิบาย</p>
      //   //       </Col>
      //   //       <Col>
      //   //         <input></input>
      //   //       </Col>
      //   //     </Row>
      //   //   </Modal>
      //   //   <Button>Delete</Button>
      //   // </Space>
      // ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "",
      sku: 32,
      store: "",
      note: "",
    },
    {
      key: "2",
      name: "",
      sku: 42,
      store: "",
      note: "",
    },
    {
      key: "3",
      name: "",
      sku: 32,
      store: "",
      note: "",
    },
    {
      key: "4",
      name: "",
      sku: 99,
      store: "",
      note: "",
    },
  ];

  return (
    <div>
      <Row justify="center" style={{ backgroundColor: "#f0f0f0" }}>
        <Col span={20}>
          <Row justify="space-between">
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
            <Col>
              <br></br>
              <br></br>
              <Button
                style={{ backgroundColor: "#262626" }}
                type="primary"
                shape="round"
                icon={<DeleteFilled />}
                size={size}
              >
                ลบ
              </Button>{" "}
              {/* <Button
                style={{ backgroundColor: "#262626" }}
                type="primary"
                shape="round"
                icon={<PlusCircleFilled />}
                size={size}
              >
                สินค้า
              </Button> */}

              <Button
                style={{ backgroundColor: "#262626" }}
                type="primary"
                onClick={showModal}
              >
                Open modal
              </Button>
              <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <ItemInput form={form} handleCancel={handleCancel} />
              </Modal>

            </Col>
          </Row>
        </Col>
      </Row>
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
            scroll={{ x: 1000 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Item;
