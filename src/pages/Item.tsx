import React, { useEffect, useState } from "react";
import {
  Button,
  ConfigProviderProps,
  Row,
  Col,
  Card,
  Modal,
  Layout,
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
  const [isReload, setIsReload] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    getItemData();
  }, []);

  useEffect(() => {
    if (isReload) {
      getItemData();
    }
    setIsReload(false);
  }, [isReload]);

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
      key: "stores",
      render: (value: any, _record) => {
        const store = value?.stores?.name || "-";

        return store;
      },
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
            <Button
              onClick={() => deleteItem(_record)}
              size="small"
              style={{ width: 60 }}
            >
              Delete
            </Button>
          </Col>
        </Space>
      ),
    },
    //------------------------------------------------------------edit modal----------------------------------------------------------------------------------------
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      console.log({ selectedRowKeys });
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const getItemData = async () => {
    const request = await axios.get("http://192.168.2.57:3000/items");
    const sortedData = request.data.data;
    setItemData(sortedData);
  };

  const deleteItem = async (value: any) => {
    const request = await axios.delete(
      "http://192.168.2.57:3000/items/" + value.id
    );
    setIsReload(true);
  };

  const deleteMutiItem = async (selectedRowKeys: any) => {
    const body: any = {
      ids: selectedRowKeys,
    }; /**สร้าง body รับ selectedRowkeys เข้า keys ids */
    // console.log(body)
    const request = await axios.delete(
      "http://192.168.2.57:3000/items/remove-multiple",
      { data: body }
    );
    setIsReload(true);
  };

  //------------------------------------------------------------Table----------------------------------------------------------------------------------------
  //------------------------------------------------------------Modal----------------------------------------------------------------------------------------

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const showModalAdd = (value?: any) => {
    if (value) {
      const formData = { ...value, stores: value?.stores?.id };
      form.setFieldsValue(formData);
    }
    setIsModalOpenAdd(true);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };
  //------------------------------------------------------------Modal----------------------------------------------------------------------------------------

  type SizeType = ConfigProviderProps["componentSize"];

  const [size] = useState<SizeType>("large");

  return (
    <Layout>
      <Card
        title={
          <span>
            <ProfileFilled style={{ marginRight: 8 }} /> จัดการ
          </span>
        }
        bordered={false}
        style={{
          backgroundColor: "white",
          margin: 65,
          borderRadius: 20,
        }}
      >
        {/* ---------------------------------------------------------------------------content-------------------------------------------------------------------------- */}
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            style={{
              backgroundColor: "#979A9C",
              color: "white",
              borderRadius: "20px",
              marginBottom: "15px",
            }}
            type="primary"
            shape="round"
            icon={<DeleteFilled />}
            size={size}
            onClick={() => deleteMutiItem(selectedRowKeys)}
          >
            ลบ
          </Button>{" "}
          <Button
            style={{
              backgroundColor: "#979A9C",
              color: "white",
              borderRadius: "20px",
              marginBottom: "15px",
              marginRight: "10px",
            }}
            type="primary"
            shape="round"
            icon={<PlusCircleFilled />}
            size={size}
            onClick={showModalAdd}
          >
            สินค้า
          </Button>
        </div>
        {/* ---------------------------------------------------------------------------modal-------------------------------------------------------------------------- */}
        <Modal
          title="เพิ่มสินค้า"
          open={isModalOpenAdd}
          centered
          onCancel={handleCancelAdd}
          footer={null}
          width={600}
        >
          <ItemInput
            form={form}
            handleCancel={handleCancelAdd}
            getItemData={getItemData}
          ></ItemInput>
        </Modal>
        {/* ---------------------------------------------------------------------------Modal-------------------------------------------------------------------------- */}
        {/* ---------------------------------------------------------------------------Table-------------------------------------------------------------------------- */}

        <Table
          rowSelection={rowSelection}
          rowKey={(record) => {
            return record.id;
          }}
          columns={columns}
          dataSource={itemData}
          pagination={{ defaultCurrent: 1 }}
          scroll={{ x: 700, y: 350 }}
          style={{ backgroundColor: "#e4e5e5" }}
        />

        {/* ---------------------------------------------------------------------------Table-------------------------------------------------------------------------- */}
        {/* ---------------------------------------------------------------------------content-------------------------------------------------------------------------- */}
      </Card>
    </Layout>
  );
};

export default Item;
