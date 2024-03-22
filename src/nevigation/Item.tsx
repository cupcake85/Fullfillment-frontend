import React, { useEffect, useState } from "react";
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
  Form,
} from "antd";
import {
  DeleteFilled,
  PlusCircleFilled,
  ProfileFilled,
} from "@ant-design/icons";
import ItemInput from "../component/item-input";
import axios from "axios";
// import ItemEdit from "../component/item-edit";

const Item = () => {
  //------------------------------------------------------------Table----------------------------------------------------------------------------------------
  interface DataType {
    id: React.Key;
    sku: string;
    name: string;
    shop: string;
    details: string;
  }

  const [form] = Form.useForm();
  const [itemData, setItemData] = useState([]);
  const [selectionType] = useState<"checkbox" | "radio">( "checkbox" );

  useEffect(() => {
    getItemData();
  }, []);

  const onClick = (value: any) => {
    showModal()
    form.setFieldsValue({
      id: value.id,
      sku: value.sku,
      details: value.details,
      name: value.name,
    })
  }

  const columns: TableColumnsType<DataType> = [
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
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "หมายเหตุ",
      dataIndex: "details",
    },
    //------------------------------------------------------------edit modal----------------------------------------------------------------------------------------
    {
      title: "",
      key: "action",
      render: (value: any, record) => (
        <Space size="middle">
          <Col>
            <Button
              onClick={() => showModalAdd(value)}
              size="small"
              style={{
                width: 60,
                backgroundColor: "#262626",
                color: "#ffffff",
              }}
            >
              Edit
            </Button>
            <Button size="small" style={{ width: 60 }} >
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
            footer={null}
          >
          </Modal>
        </Space>
      ),
    },
    //------------------------------------------------------------edit modal----------------------------------------------------------------------------------------
  ];

  const rowSelection = {
    type: selectionType,
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      name: record.name,
    }),
  };

  const getItemData = async () => {
    const request = await axios.get('http://192.168.2.57:3000/items/')
    console.log('request', request)
    setItemData(request.data.data)
  }
  //------------------------------------------------------------Table----------------------------------------------------------------------------------------
  //------------------------------------------------------------Modal----------------------------------------------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalAdd = (value?:any) => {
    if(value ){
      form.setFieldsValue(value)
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
  //------------------------------------------------------------Modal----------------------------------------------------------------------------------------

  type SizeType = ConfigProviderProps["componentSize"];

  const [size] = useState<SizeType>("large");

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
                rowSelection={rowSelection}
                columns={columns}
                dataSource={itemData}
                pagination={{ defaultCurrent: 1, total:50}}
                scroll={{ x: 400, y: 350 }}
                style={{ backgroundColor: '#e4e5e5' }}
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
