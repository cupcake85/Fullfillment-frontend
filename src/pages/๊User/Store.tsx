import React from "react";
import { useState, useEffect } from "react";
import {
  Layout,
  Form,
  Button,
  theme,
  Card,
  Modal,
  Table,
  Input,
  TableColumnsType,
  notification,
  Row,
  Col,
} from "antd";
import type { FormItemProps } from "antd";
import { useForm } from "antd/es/form/Form";
import InputStore from "../../component/storeInput";
import EditStore from "../../component/storeEdit";
import axios from "axios";
import {
  DeleteFilled,
  EditFilled,
  PlusCircleFilled,
  PlusCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Store = () => {
  interface DataType {
    name: string;
    shipperCode: string;
    shipperName: string;
    zipCode: string;
    phoneNumber: string;
    email: string;
  }

  const { Content } = Layout;
  const [itemData, setItemData] = useState([]);
  const [form] = useForm();
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
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

  const showModalAdd = (value?: any) => {
    if (value) {
      form.setFieldsValue(value);
    }
    setIsModalOpenAdd(true);
  };
  const showModalEdit = () => {
    setIsModalEdit(true);
  };
  const cancelModalEdit = () => {
    setIsModalEdit(false);
  };

  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const editClick = (value: any) => {
    console.log("ตรงนี้นะ", value);
    showModalEdit();
    form.setFieldsValue({
      id: value.id,
      name: value.name,
      shipperCode: value.shipperCode,
      shipperName: value.shipperName,
      zipCode: value.zipCode,
      phoneNumber: value.phoneNumber,
      email: value.email,
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "ชื่อลูกค้า",
      dataIndex: "name",
    },
    {
      title: "รหัสผู้จัดส่ง",
      dataIndex: "shipperCode",
    },
    {
      title: "ชื่อผู้จัดส่ง",
      dataIndex: "shipperName",
    },
    {
      title: "รหัสไปรษณีย์ผู้จัดส่ง",
      dataIndex: "zipCode",
      width: "200px",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "phoneNumber",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
    },
    {
      title: "จัดการ",
      // dataIndex: "email",
      render: (value: any, record: any) => {
        return (
          <div>
            <div>
              <Button
                onClick={() => editClick(record)}
                style={{
                  width: 60,
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
                onClick={() => deleteStore(record)}
                style={{ width: 60, borderRadius: "0px 0px 5px 5px" }}
              >
                ลบ
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const getItemData = async () => {
    const request = await axios.get("http://192.168.2.57:3000/stores/", {
      params: { ...searchQuery },
    });
    console.log("request", request);
    setItemData(request.data.data);
  };

  const onClickSearch = () => {
    getItemData();
  };

  const deleteStore = async (value: any) => {
    Modal.confirm({
      title: "ยืนยันการลบ",
      content: "คุณต้องการลบรายการนี้หรือไม่?",
      onOk: async () => {
        try {
          await axios.delete("http://192.168.2.57:3000/stores/" + value.id);
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
            <UserOutlined
              style={{
                marginRight: "20px",
                fontSize: "50px",
                marginLeft: "20px",
              }}
            />
            <div>ร้านค้า</div>
          </span>
        }
        bordered={false}
        style={{
          backgroundColor: "white",
          margin: 65,
          borderRadius: 20,
          marginTop: "40px",
        }}
      >
        <Row style={{ padding: "20px" }}>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "30px",
                marginRight: "30px",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "kanit",
                alignItems: "center",
              }}
            >
              รหัสผู้จัดส่ง
              <Input
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    shipperCode: e.target.value,
                  })
                }
                style={{
                  width: "300px",
                  height: "40px",
                  borderRadius: "25px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  border: "solid 1px",
                  fontFamily: "kanit",
                }}
                placeholder="รหัสผู้จัดส่ง"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "30px",
                marginRight: "30px",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "kanit",
                marginTop: "22px",
                alignItems: "center",
              }}
            >
              ร้านค้า
              <Input
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    storesName: e.target.value,
                  })
                }
                style={{
                  width: "300px",
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
          </Col>
          <Col span={12}>
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
              }}
            >
              ชื่อผู้จัดส่ง
              <Input
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    shipperName: e.target.value,
                  })
                }
                style={{
                  width: "300px",
                  height: "40px",
                  borderRadius: "25px",
                  marginLeft: "15px",
                  border: "solid 1px",
                  fontFamily: "kanit",
                }}
                placeholder="ชื่อผู้จัดส่ง"
              />
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
                onClick={onClickSearch}
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
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Button
            type="primary"
            onClick={showModalAdd}
            icon={<PlusCircleFilled />}
            style={{
              backgroundColor: "#979A9C",
              color: "white",
              borderRadius: "25px",
              width: "180px",
              height: "40px",
              fontFamily: "kanit",
              fontSize: "18px",
            }}
          >
            เพิ่มผู้ใช้งาน
          </Button>
        </div>
        <Modal
          title="เพิ่มผู้ใช้งาน"
          open={isModalOpenAdd}
          onOk={handleOkAdd}
          onCancel={handleCancelAdd}
          footer={null}
          style={{ fontFamily: "kanit" }}
        >
          <InputStore
            form={form}
            handleCancel={handleCancelAdd}
            setIsReload={setIsReload}
          ></InputStore>
        </Modal>
        <Modal
          title="แก้ไข"
          open={isModalEdit}
          onCancel={cancelModalEdit}
          footer={null}
        >
          <EditStore
            form={form}
            handleCancelEdit={cancelModalEdit}
            setIsReload={setIsReload}
            getItemData={getItemData}
          ></EditStore>
        </Modal>
        <Table
          dataSource={itemData}
          style={{
            backgroundColor: "#e4e5e5",

            borderRadius: "20px",
          }}
          pagination={{
            total: getHistory.length,
            showSizeChanger: true,
            pageSize: 10,
          }}
          columns={columns}
          // scroll={{ x: 400, y: 350 }} // ถ้าหน้าจอกว้างน้อยกว่า 700 จะขึ้น scroll
        />
      </Card>
    </Layout>
  );
};

export default Store;
