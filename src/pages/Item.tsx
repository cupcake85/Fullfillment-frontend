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
  notification,
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
    Modal.confirm({
      title: "ยืนยันการลบ",
      content: "คุณต้องการลบรายการนี้หรือไม่?",
      onOk: async () => {
        try {
          await axios.delete("http://192.168.2.57:3000/items/" + value.id);
          notification.success({
            message: "ลบสำเร็จ",
            description: "ลบรายการเรียบร้อยแล้ว",
          });
          setIsReload(true);
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการลบรายการ:", error);
        }
      },
      onCancel: () => {
        console.log("ยกเลิกการลบรายการ");
      },
    });
  };

  const deleteMutiItem = async (selectedRowKeys: any) => {
    const body: any = {
      ids: selectedRowKeys,
    };
    Modal.confirm({
      title: "ยืนยันการลบ",
      content: "คุณต้องการลบรายการที่เลือกทั้งหมดหรือไม่?",

      onOk: async () => {
        try {
          const request = await axios.delete(
            "http://192.168.2.57:3000/items/remove-multiple",
            { data: body }
          );
          setIsReload(true);
          setSelectedRowKeys([]);
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการลบ:", error);
        }
      },
      onCancel: () => {
        console.log("ยกเลิกการลบ");
      },
    });
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
          <span
            style={{
              display: "flex",
              alignContent: "baseline",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <ProfileFilled
              style={{
                marginRight: "20px",
                fontSize: "50px",
                marginLeft: "20px",
              }}
            />{" "}
            จัดการ
          </span>
        }
        bordered={false}
        style={{
          backgroundColor: "white",
          margin: 65,
          borderRadius: 20,
          fontFamily: "kanit",
          marginTop: "40px",
        }}
      >
        {/* ---------------------------------------------------------------------------content-------------------------------------------------------------------------- */}
        <div style={{ padding: "20px" }}>
          <div className="flex items-baseline ">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "20px",
                marginRight: "20px",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "kanit",
                alignItems: "center",
              }}
            >
              SKU
              <Input
                onChange={
                  (e) => setSearchQuery({ ...searchQuery, sku: e.target.value }) //สร้าง {} ใหม่ โยการเอาค่าเก่าเข้ามาใส่ใน {} ใหม่ด้วย
                }
                style={{
                  width: "150px",
                  height: "40px",
                  borderRadius: "25px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  border: "solid 1px",
                  fontFamily: "kanit",
                }}
                placeholder="SKU"
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "20px",
                marginRight: "20px",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "kanit",
                alignItems: "center",
              }}
            >
              ร้านค้า
              <Input
                onChange={
                  (e) =>
                    setSearchQuery({ ...searchQuery, stores: e.target.value }) //สร้าง {} ใหม่ โยการเอาค่าเก่าเข้ามาใส่ใน {} ใหม่ด้วย
                }
                style={{
                  width: "280px",
                  height: "40px",
                  borderRadius: "25px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  border: "solid 1px",
                  fontFamily: "kanit",
                }}
                placeholder="ร้านค้า"
              />
            </div>

            <div className="flex items-baseline">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "20px",
                  marginRight: "20px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "kanit",
                  alignItems: "center",
                }}
              >
                ชื่อสินค้า
                <Input
                  onChange={
                    (e) =>
                      setSearchQuery({ ...searchQuery, name: e.target.value }) //สร้าง {} ใหม่ โยการเอาค่าเก่าเข้ามาใส่ใน {} ใหม่ด้วย
                  }
                  style={{
                    width: "200px",
                    height: "40px",
                    borderRadius: "25px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    border: "solid 1px",
                    fontFamily: "kanit",
                  }}
                  placeholder="ชื่อสินค้า"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignContent: "baseline",
            }}
          >
            <div className="flex items-baseline">
              <div className="flex items-baseline">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "30px",
                    marginRight: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "kanit",
                    alignItems: "center",
                    marginTop: "22px",
                  }}
                >
                  รายละเอียด
                  <Input
                    onChange={
                      (e) =>
                        setSearchQuery({
                          ...searchQuery,
                          details: e.target.value,
                        }) //สร้าง {} ใหม่ โยการเอาค่าเก่าเข้ามาใส่ใน {} ใหม่ด้วย
                    }
                    style={{
                      width: "450px",
                      height: "40px",
                      borderRadius: "25px",
                      marginLeft: "15px",
                      marginRight: "15px",
                      border: "solid 1px",
                      fontFamily: "kanit",
                    }}
                    placeholder="รายละเอียด"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignContent: "baseline",
                  justifyContent: "space-between",
                  marginRight: "30px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "kanit",
                  alignItems: "center",
                  marginTop: "22px",
                }}
              >
                <Button
                  onClick={() => onClickSearch()}
                  style={{
                    backgroundColor: "#2F353A",
                    borderRadius: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "25px",
                    height: "40px",
                    width: "40px",
                  }}
                  icon={<SearchOutlined />}
                ></Button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Button
            style={{
              backgroundColor: "#979A9C",
              color: "white",
              borderRadius: "25px",
              width: "80px",
              height: "40px",
              fontFamily: "kanit",
              fontSize: "18px",
              marginRight: "10px",
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
              height: "40px",
              fontSize: "18px",
              fontFamily: "kanit",
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
