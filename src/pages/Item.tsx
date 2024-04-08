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
  Input,
} from "antd";
import {
  DeleteFilled,
  PlusCircleFilled,
  ProfileFilled,
  SearchOutlined,
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
  const [getHistory, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState<Record<string, unknown>>();

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
      render: (_: any, __: any, index: number) => {
        return index + 1;
      },
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
          <div>
            <div>
              <Button
                onClick={() => showModalAdd(value)}
                style={{
                  width: 70,
                  backgroundColor: "#3B4248",
                  color: "#ffffff",
                  borderRadius: "5px 5px 0px 0px",
                }}
              >
                แก้ไข
              </Button>
            </div>
            <div>
              <Button
                onClick={() => deleteItem(_record)}
                style={{ width: 70, borderRadius: "0px 0px 5px 5px" }}
              >
                ลบ
              </Button>
            </div>
          </div>
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
    const request = await axios.get("http://192.168.2.57:3000/items", {
      params: { ...searchQuery },
    });
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

  const onClickSearch = () => {
    getItemData();
  };

  return (
    <Layout>
      <Card
        title={
          <span>
            <ProfileFilled style={{ marginRight: 8, fontSize: "50px" }} />{" "}
            จัดการ
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
        <div className="flex items-baseline">
          <div className="flex items-baseline">
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>SKU</div>
            <Form.Item>
              <Input
                onChange={
                  (e) => setSearchQuery({ ...searchQuery, sku: e.target.value }) //สร้าง {} ใหม่ โยการเอาค่าเก่าเข้ามาใส่ใน {} ใหม่ด้วย
                }
                style={{
                  width: "150px",
                  borderRadius: "25px",
                  marginBottom: "15px",
                  height: "35px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  border: "solid 1px",
                }}
                placeholder="SKU"
              />
            </Form.Item>
          </div>
          <div className="flex items-baseline">
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>ร้านค้า</div>
            <Form.Item>
              <Input
                onChange={
                  (e) =>
                    setSearchQuery({ ...searchQuery, stores: e.target.value }) //สร้าง {} ใหม่ โยการเอาค่าเก่าเข้ามาใส่ใน {} ใหม่ด้วย
                }
                style={{
                  width: "280px",
                  borderRadius: "25px",
                  marginBottom: "15px",
                  height: "35px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  border: "solid 1px",
                }}
                placeholder="ร้านค้า"
              />
            </Form.Item>
          </div>
          <div className="flex items-baseline">
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              ชื่อสินค้า
            </div>
            <Form.Item>
              <Input
                onChange={
                  (e) =>
                    setSearchQuery({ ...searchQuery, name: e.target.value }) //สร้าง {} ใหม่ โยการเอาค่าเก่าเข้ามาใส่ใน {} ใหม่ด้วย
                }
                style={{
                  width: "200px",
                  borderRadius: "25px",
                  marginBottom: "15px",
                  height: "35px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  border: "solid 1px",
                }}
                placeholder="ชื่อสินค้า"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex items-baseline">
          <div className="flex items-baseline">
            <div className="flex items-baseline">
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                รายละเอียด
              </div>
              <Form.Item>
                <Input
                  onChange={
                    (e) =>
                      setSearchQuery({
                        ...searchQuery,
                        details: e.target.value,
                      }) //สร้าง {} ใหม่ โยการเอาค่าเก่าเข้ามาใส่ใน {} ใหม่ด้วย
                  }
                  style={{
                    width: "500px",
                    borderRadius: "25px",
                    marginBottom: "15px",
                    height: "35px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    border: "solid 1px",
                  }}
                  placeholder="รายละเอียด"
                />
                <Button
                  onClick={() => onClickSearch()}
                  style={{
                    backgroundColor: "#2F353A",
                    borderRadius: "25px",
                    marginBottom: "15px",
                    height: "40px",
                    width: "40px",

                    color: "#fff",
                  }}
                  icon={<SearchOutlined />}
                ></Button>
              </Form.Item>
            </div>
          </div>
          <div
            style={{
              flexDirection: "row-reverse",
              marginLeft: "220px",
              display: "flex",
            }}
          >
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
          pagination={{
            total: getHistory.length,
            showSizeChanger: true,
            pageSize: 10,
          }}
          // scroll={{ x: 700, y: 350 }}
          style={{ backgroundColor: "#e4e5e5" }}
        />

        {/* ---------------------------------------------------------------------------Table-------------------------------------------------------------------------- */}
        {/* ---------------------------------------------------------------------------content-------------------------------------------------------------------------- */}
      </Card>
    </Layout>
  );
};

export default Item;
