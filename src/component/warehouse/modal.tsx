import { Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC } from "react";

export type TTypeModal = "history" | "edit" | "action";

interface IModalWarehouse {
    open: boolean; //ค่าบูลีน
    onClose: () => void; //ฟังก์ชันที่ไม่รับ argument มีหน้าที่ในการอัพเดตสถานะเพื่อปิดโมดอล
    type: TTypeModal; //ตัวแปร TTypeModal ระบุประเภทของโมดาลที่แสดง
    item?: IItem; //เป็น item ใน warehouse ที่กำหนดโครงสร้างข้อมูลเป็น IItem ซึ่ง item อาจจะมีหรือไม่มีก็ได้
    updateWarehouse: (id: number, formData: any) => void;
}

export interface IItem {
    id: number;
    sku: string;
    name: string;
    details: string;
    quantity: number;
    stores: string;
}

const ModalWarehouse: FC<IModalWarehouse> = ({
    open,
    onClose,
    type,
    item,
    updateWarehouse,
}) => {
    const [form] = useForm();
    console.log(item)
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
            width={type === "edit" ? 600 : 120}
            footer={null}
            centered
        >

        </Modal>
    )
}

export default ModalWarehouse;