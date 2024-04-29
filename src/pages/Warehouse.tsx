import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Modal,
  Table,
  Input,
  Form,
  InputNumber,
  Layout,
  Dropdown,
  Space,
  DatePicker,
} from "antd";
import "../warehouse.css";
import axios, { AxiosResponse } from "axios";
import { useForm } from "antd/es/form/Form";
import {
  CloseCircleFilled,
  ContainerFilled,
  DownOutlined,
  FolderFilled,
  PlusCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { IResult, Iitem } from "../interface/item.interface";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

const inputFilterStyle: React.CSSProperties = {
  width: "250px",
  borderRadius: "25px",
  marginBottom: "15px",
  height: "35px",
  marginLeft: "15px",
  marginRight: "15px",
  border: "solid 1px",
  fontFamily: "kanit",
};

const Warehouse = () => {
  const [warehousedata, setWarehouse] = useState<Iitem[]>([]);
  const [addModal, setAddmodal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Iitem[]>([]); // เพิ่ม state เก็บข้อมูลที่เลือกไว้
  const [searchQuery, setSearchQuery] = useState<Record<string, unknown>>();
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalHistory, setIsModalHistory] = useState(false);
  const [getHistory, setHistory] = useState([]);
  const [sku, setSku] = useState();

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showAddModal = () => {
    setAddmodal(true);
  };
  const addCancel = () => {
    setAddmodal(false);
  };
  const showModalh = () => {
    setIsModalHistory(true);
  };
  const handleCancelh = () => {
    setIsModalHistory(false);
  };
  const clickManage = () => {
    showAddModal();
  };

  useEffect(() => {
    getWarehouse();
  }, []);

  const warehouseColumns = [
    {
      title: "#",
      render: (_: any, __: any, index: number) => {
        return <div className=" font-[kanit]">{index + 1}</div>;
      },
      align: "center",
    },
    {
      title: "SKU",
      dataIndex: "sku", //ชื่อ dataIndex ตรงกับชื่อ field ใน dataSource
      align: "center",
    },
    {
      title: "ชื่อสินค้า",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "รายละเอียด",
      dataIndex: "details",
      align: "center",
    },
    {
      title: "ร้านค้า",
      dataIndex: "stores", //key
      render: (value: any, record: any) => {
        //record คือ ทั้งแถว
        return <p>{value?.name}</p>; //value คือ เลือกเฉพาะ key ที่สนใจแล้วตามด้วยชื่อข้อมูลที่ต้องการมาแสดง
      },
      align: "center",
    },
    {
      title: "คงเหลือ",
      key: "quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "",
      align: "center",
      render: (value: any, record: any) => {
        return (
          <div>
            <div>
              <Button
                onClick={() => editClick(value)}
                style={{
                  backgroundColor: "#3B4248",
                  color: "white",
                  borderRadius: "5px 5px 0px 0px",
                  width: 70,
                }}
              >
                แก้ไข
              </Button>
            </div>
            <div>
              <Button
                onClick={() => historyClick(value)}
                style={{
                  backgroundColor: "white",
                  borderRadius: "0px 0px 5px 5px",
                  width: 70,
                }}
              >
                ประวัติ
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const addColumns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "ชื่อสินค้า",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "รายละเอียด",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "คงเหลือ",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      tilte: "เพิ่ม/ลด",
      render: (record: any) => {
        return (
          <Form.Item name={record.id} initialValue={0}>
            <InputNumber className=" rounded-full" />
          </Form.Item>
        );
      },
      key: "input",
    },
  ];

  const columnHistory = [
    {
      key: "date",
      title: "วันที่",
      dataIndex: "outDate",
      render: (rc: any) => {
        const date = dayjs(rc.outDate).format("DD/MM/YYYY HH:mm");
        return <>{date}</>;
      },
      align: "center",
    },
    {
      key: "quantity",
      title: "ปริมาณ",
      dataIndex: "quantity",
      align: "center",
    },

    {
      key: "remark",
      title: "หมายเหตุ",
      dataIndex: "remark",
      align: "center",
    },
  ];

  const retrieveAllItems = async (): Promise<
    AxiosResponse<IResult<Iitem[]>>
  > => {
    const request: AxiosResponse<IResult<Iitem[]>> = await axios.get(
      "http://192.168.2.57:3000/items/",
      {
        params: { ...searchQuery },
      }
    );
    return request;
  };

  const getWarehouse = async () => {
    const request = await retrieveAllItems();
    console.log(request);
    setWarehouse(request.data.data);
  };

  const editClick = (value: any) => {
    showModal();
    form.setFieldsValue({
      //เซ็ทจาก value ในตารางที่เก็บมา
      id: value.id,
      sku: value.sku,
      quantity: value.quantity,
    });
  };

  const editSubmit = () => {
    const formData = form.getFieldsValue(["id", "quantityEdit"]); //รับค่าที่กรอกในฟอร์มจากฟิลด์ที่กำหนดไว้
    updateWarehouse(formData); // เรียกใช้ updateWarehouse() โดยส่งข้อมูล id และ formData เพื่ออัปเดตข้อมูลในคลังสินค้า
    form.resetFields();
    setIsModalVisible(false);
  };

  const updateWarehouse = async (formData: any) => {
    const body = {
      item: formData.id, //เลือกว่าจะเอาข้อมูลไหนจาก formData
      quantity: Number(formData.quantityEdit),
    };
    try {
      await axios.put("http://192.168.2.57:3000/items/update-quantity", body);
      getWarehouse(); // เมื่อทำการส่งข้อมูลสำเร็จ ให้ดึงข้อมูลคลังสินค้าใหม่
    } catch (error: any) {
      alert(error?.response?.data.message);
    }
  };

  //คลิปกปุ่มแสดง modal ประวัติ
  const historyClick = (value: any) => {
    showModalh();
    history(value.id);
    setSku(value.sku);
  };

  const history = async (id: number) => {
    try {
      const request = await axios.get("http://192.168.2.57:3000/history/" + id);
      setHistory(request.data.data); //data.data => data แรกคือ data จาก axios, data ที่สองคือ data จากหลังบ้าน
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: Iitem[]) => {
      //onChange เอาไปใช้ใน table ได้เลย
      setSelectedRows(selectedRows); // เมื่อมีการเลือกแถวใหม่ให้เซ็ตค่า state
    },
  };

  const multipleSubmit = (rowValue: any) => {
    const rowData = selectedRows.map((item: any) => {
      return { item: item.id, quantity: rowValue[item.id] };
    });
    updateMultiple(rowData);
    form.resetFields();
    setAddmodal(false);
  };

  const updateMultiple = async (selectedRows: any) => {
    try {
      await axios.put(
        "http://192.168.2.57:3000/items/update-quantity-multiple",
        selectedRows
      );
      getWarehouse();
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  const onClickSearch = () => {
    getWarehouse();
  };

  return (
    <Layout>
      {/* <ContainerFilled /> */}
      <Card
        title={
          <span>
            <ContainerFilled style={{ marginRight: 8, fontSize: "40px" }} />
            คลังสินค้า
          </span>
        }
        bordered={false}
        style={{
          backgroundColor: "white",
          margin: 65,
          borderRadius: 20,
        }}
      >
        <div>
          <Button
            style={{
              backgroundColor: "#2F353A",
              borderRadius: "25px",
              marginBottom: "10px",
              height: "35px",
              width: "200px",
              color: "#fff",
            }}
          >
            <Dropdown trigger={["click"]}>
              <a
                style={{
                  cursor: "pointer",
                }}
              >
                <Space>
                  <div className=" text-[20px] mr-4">SOL</div>
                  <div className=" text-[12px] ">10 รายการ</div>

                  <DownOutlined
                    style={{
                      backgroundColor: "#fff",
                      color: "#2F353A",
                      borderRadius: "30px",
                      padding: "4px",
                      marginLeft: "8px",
                    }}
                  />
                </Space>
              </a>
            </Dropdown>
          </Button>{" "}
          <Input
            onChange={
              (e) =>
                setSearchQuery({ ...searchQuery, everything: e.target.value }) //สร้าง {} ใหม่ โยการเอาค่าเก่าเข้ามาใส่ใน {} ใหม่ด้วย
            }
            style={inputFilterStyle}
            placeholder="พิมพ์คำค้นหา"
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
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            icon={<PlusCircleFilled />}
            onClick={() => clickManage()}
            style={{
              backgroundColor: "#979A9C",
              color: "white",
              borderRadius: "25px",
              marginBottom: "15px",
              height: "35px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            จัดการเพิ่ม/ลด
          </Button>
        </div>

        <Table
          rowSelection={rowSelection}
          rowKey="id" //ใช้ id แยกข้อมูลที่มาจาก array แล้ว
          pagination={{
            total: getHistory.length,
            showSizeChanger: true,
            pageSize: 10,
          }}
          style={{ backgroundColor: "#E4E5E5" }}
          dataSource={warehousedata}
          columns={warehouseColumns}
          // scroll={{ x: 400, y: 350 }} //ความกว้าง scroll ได้ 1200
        />
      </Card>
      {/* Mo */}
      <Modal
        title="แก้ไขสินค้า"
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          autoComplete="off"
        >
          <Form.Item
            label={<div className=" font-[kanit]">SKU</div>}
            name="sku"
          >
            <Input
              disabled
              style={{
                borderRadius: 100,
                border: "solid 1px grey",
                fontFamily: "kanit",
                width: "200px",
              }}
            />
          </Form.Item>

          <Form.Item
            label={<div className=" font-[kanit]">สินค้าคงเหลือ</div>}
            name="quantity"
          >
            <Input
              disabled
              style={{
                borderRadius: 100,
                border: "solid 0.5px grey",
                fontFamily: "kanit",
              }}
            />
          </Form.Item>
          <Form.Item
            label={<div className=" font-[kanit]">เพิ่ม-ลดสินค้า</div>}
            name="quantityEdit"
            rules={[{ required: true, message: "*โปรดกรอกจำนวนที่ต้องการ" }]}
          >
            <Input
              type="number"
              placeholder="Ex. 100/-100"
              style={{
                borderRadius: 100,
                border: "solid 0.5px grey",
                fontFamily: "kanit",
              }}
            />
          </Form.Item>
          <Form.Item
            label={<div className=" font-[kanit]">หมายเหตุ</div>}
            name="quantityEdit"
          >
            <TextArea
              style={{
                borderRadius: 10,
                border: "solid 0.5px grey",
                fontFamily: "kanit",
              }}
            />
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Button
              icon={<FolderFilled />}
              onClick={editSubmit}
              style={{
                backgroundColor: "#bc211c",
                margin: 10,
                color: "white",
                borderRadius: 100,
              }}
            >
              บันทึก
            </Button>
            <Button
              icon={<CloseCircleFilled />}
              onClick={handleCancel}
              style={{
                backgroundColor: "#2F353A",
                color: "white",
                borderRadius: 100,
              }}
            >
              ยกเลิก
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="จัดการสินค้า"
        open={addModal}
        onCancel={addCancel}
        footer={null}
      >
        <Form form={form} onFinish={multipleSubmit}>
          <Table
            style={{ backgroundColor: "#e4e5e5" }}
            columns={addColumns}
            dataSource={selectedRows}
            pagination={{ defaultCurrent: 1 }}
          />
          <div style={{ textAlign: "center" }}>
            <Button
              htmlType="submit"
              icon={<FolderFilled />}
              style={{
                backgroundColor: "#bc211c",
                margin: 10,
                color: "white",
                borderRadius: 100,
              }}
            >
              บันทึก
            </Button>
            <Button
              icon={<CloseCircleFilled />}
              onClick={handleCancel}
              style={{
                backgroundColor: "#2F353A",
                color: "white",
                borderRadius: 100,
              }}
            >
              ยกเลิก
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title={sku}
        open={isModalHistory}
        onCancel={handleCancelh}
        footer={null}
        style={{ width: "800px" }}
      >
        <div className=" mb-4 flex flex-col justify-center items-center">
          <div>
            วันที่เริ่ม
            <DatePicker style={inputFilterStyle} placeholder="2021-04-02" />
          </div>
          <div>
            วันที่จบ{" "}
            <DatePicker style={inputFilterStyle} placeholder="2021-04-02" />
          </div>
          <Button
            icon={<SearchOutlined />}
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100px",
              borderRadius: "40px",
            }}
          >
            ค้นหา
          </Button>
        </div>

        <Table
          style={{ backgroundColor: "#e4e5e5", width: "auto" }}
          dataSource={getHistory}
          columns={columnHistory}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
      </Modal>
      <button onClick={() => navigate("/Login")}>ไปที่ Login</button>
    </Layout>
  );
};

export default Warehouse;
