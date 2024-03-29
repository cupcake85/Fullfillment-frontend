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

const Item = () => {
  //------------------------------------------------------------Table----------------------------------------------------------------------------------------
  interface DataType {
    id: React.Key;
    sku: string;
    name: string;
    details: string;
    stores: number;
  }

  const [form] = Form.useForm();
  const [itemData, setItemData] = useState([]);
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
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
      stores: value.stores,
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
    {
      title: "ร้านค้า",
      dataIndex: "stores",
    },
    //------------------------------------------------------------edit modal----------------------------------------------------------------------------------------
    {
      title: "",
      key: "action",
      render: (value: any, _record) => (
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
            <Button onClick={ () => deleteItem(_record)} size="small" style={{ width: 60 }} >
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
      setSelectedRows(selectedRows);
    },
    // getCheckboxProps: (record: DataType) => ({
    //   name: record.name,
    // }),
  };

  const getItemData = async () => {
    const request = await axios.get('http://192.168.2.57:3000/items')
    const sortedData = request.data.data.sort((a: any, b: any) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    sortedData.stores = parseInt(sortedData.stores)
    setItemData(sortedData)
  }

  const deleteItem = async (value:any) => {
    const request = await axios.delete('http://192.168.2.57:3000/items/' + value.id)
    getItemData()
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
                pagination={{ defaultCurrent: 1}}
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