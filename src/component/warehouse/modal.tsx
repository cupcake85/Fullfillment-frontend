import { CloseCircleFilled, FolderFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table, TableColumnsType } from "antd";
import { FormInstance, useForm } from "antd/es/form/Form";
import axios from "axios";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

export type TTypeModal = "history" | "edit" | "action";

// Interface ใน TypeScript ถูกใช้เพื่อระบุโครงสร้างข้อมูลที่คาดหวังและมักจะใช้ในการตรวจสอบชนิดข้อมูล
interface IModalWarehouse {
  open: boolean;
  onClose: () => void; //ฟังก์ชันที่จะถูกเรียกเมื่อโมดัลถูกปิด
  type: TTypeModal;
  item?: IItem;
  updateWarehouse: (id: number, formData: any) => void;
}

export interface IItem { //ข้อมูลในตารางคลังสินค้า
  details: string;
  id: number;
  name: string;
  quantity: number;
  sku: string;
  stores: string; //เพิ่มร้านค้า
}

export interface IHistory { //Interface ของตารางประวัติ
  id: number;
  lot: string;
  order: string;
  outDate: string;
  quantity: number;
  remark: string;
  item: IHistoryItem; // ข้อมูลของสินค้าในประวัติสินค้า (IHistoryItem)
}

interface IHistoryItem { //รายการสินค้าในประวัติ
  details: string;
  id: number;
  name: string;
  quantity: number;
  sku: string;
}

//component ชื่อ ModalWarehouse ซึ่งใช้สำหรับแสดงโมดัลที่เกี่ยวข้องกับคลังสินค้า
const ModalWarehouse: FC<IModalWarehouse> = ({ //รับ props จาก interface IModalWarehouse
  onClose,
  open,
  type,
  item,
  updateWarehouse,
}) => {
  const [form] = useForm();
  console.log(item);
  console.log(open);
  console.log(type);

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="modal"
      open={open}
      onCancel={onCancel}
      forceRender={true}
      width={type === "edit" ? 600 : 1200}
      footer={null}
      centered
    >
      <div className="mt-4">
        {type === "history" ? (
          <ContentHistory open={open} id={item?.id} /> //component ที่ถูกใช้ในการแสดงข้อมูลประวัติหรือฟอร์มแก้ไขข้อมูล ตามลำดับ
        ) : type === "edit" ? (
          <ContentEdit 
            item={item}
            open={open}
            onSubmit={updateWarehouse}
            onClose={onCancel}
            form={form}
          />
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

interface IContentHis {
  id?: number;
  open: boolean;
}

const ContentHistory: FC<IContentHis> = ({ id, open }) => { //คอมโพเนนท์ข้อมูลของประวัติ
  const [dataHistory, setHistory] = useState<IHistory[]>([]); //สร้าง State เก็บข้อมูลทีได้จากการ get โดยใช้ Interface IContentHis

  useEffect(() => {
    getHistory(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const getHistory = async (id?: number) => {
    try {
      const request = await axios.get("http://192.168.2.57:3000/history/");
      const history = request.data.data.filter((item: IHistory) => {
        console.log("ไอเท็ม", item, id);
        return item?.item?.id === id; //เช็ค null
      });
      setHistory(history);
    } catch (err) {
      console.log(err);
    }
  };

  const columns: TableColumnsType<IHistory> = [
    {
      title: "วันที่",
      dataIndex: "outDate",
      render: (_, rc) => {
        const date = dayjs(rc.outDate).format("MM/DD/YYYY");
        return <>{date}</>;
      },
    },
    {
      title: "เวลา",
      dataIndex: "outDate",
      render: (_, rc) => {
        const date = dayjs(rc.outDate).format("HH:mm:ss");
        return <>{date}</>;
      },
    },
    {
      title: "ชื่อสินค้า",
      dataIndex: "note",
    },
    {
      title: "รายละเอียด",
      dataIndex: "remark",
    },
    {
      title: "คงเหลือ",
      key: "quantity",
      dataIndex: "quantity",
    },
  ];

  return (
    <div className="p-7">
      <Table
        // pagination={{ defaultCurrent: 1 }}
        style={{ backgroundColor: "#e4e5e5" }}
        dataSource={dataHistory}
        columns={columns}
        scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
      />
    </div>
  );
};

interface IContentEdit {
  item?: IItem;
  open: boolean;
  onSubmit: (id: number, formData: any) => void;
  onClose: () => void;
  form: FormInstance;
}

const ContentEdit: FC<IContentEdit> = ({
  item,
  open,
  onSubmit,
  onClose,
  form,
}) => {
  useEffect(() => {
    form.setFieldsValue({
      id: item?.id,
      sku: item?.sku,
      quantity: item?.quantity,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const editOk = () => {
    const formData = form.getFieldsValue([
      "id",
      "sku",
      "details",
      "name",
      "quantity",
    ]);
    onSubmit?.(formData.id, formData);
    onClose;
  };

  return (
    <div className="flex justify-center w-full">
      <Form name="basic" form={form} autoComplete="off" className="w-full">
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="SKU" name="sku">
          <Input
            disabled
            style={{ borderRadius: 100, border: "solid 0.5px grey" }}
          />
        </Form.Item>

        <Form.Item label="สินค้าคงเหลือ" name="quantity">
          <Input
            disabled
            style={{ borderRadius: 100, border: "solid 0.5px grey" }}
          />
        </Form.Item>
        <Form.Item
          label="เพิ่มลดสินค้า"
          rules={[{ required: true, message: "+100" }]}
        >
          <Input
            type="number"
            placeholder="+/-100"
            style={{ borderRadius: 100, border: "solid 0.5px grey" }}
          />
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <Button
            icon={<FolderFilled />}
            onClick={editOk}
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
            onClick={onClose}
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
    </div>
  );
};

export default ModalWarehouse;