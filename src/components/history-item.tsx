import { Button, Form, FormInstance, Input, Table, notification } from "antd";
import axios from "axios";
import { useState } from "react";

const HistoryTable = () => {
    const [warehousedata, setWarehouse] = useState([]);
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
        },
        {
            title: 'ชื่อสินค้า',
            dataIndex: 'name',
        },
        {
            title: 'รายละเอียด',
            dataIndex: 'details',
        },
        {
            title: 'คงเหลือ',
            key: 'quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Action',
            render: (value: any, record: any) => {
                console.log(value);
                return <div>
                    <Button >แก้ไข</Button>
                    <Button >ประวัติ</Button>
                </div>
            }
        }
    ];

    const getWarehouse = async () => {
        const request = await axios.get('http://192.168.2.57:3000/items/')
        console.log('request', request)
        setWarehouse(request.data.data)
      }
    return (
        <div>
        <Table
          pagination={{ defaultCurrent: 1 }} //แถบเลือกหน้า
          style={{ backgroundColor: '#e4e5e5' }}
          dataSource={warehousedata}
          // dataSource={data}
          columns={columns}
          scroll={{ x: 700 }} //ความกว้าง scroll ได้ 1200
        />
        </div>
    )
}

export default HistoryTable;
