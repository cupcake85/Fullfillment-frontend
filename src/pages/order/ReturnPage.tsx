import { Button, Card, Layout, TableProps } from "antd";
import React, { useState } from "react";
import Table from "../../component/table";
import { RetweetOutlined } from "@ant-design/icons";
import TableStatus from "../../component/TableStatus";

interface DataType {
  details: string;
  zipCode: string;
  customerName: string;
}

function ReturnPage() {
  const [statuschange, setStatusChange] = useState<string>("");

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "รายละเอียด",
      dataIndex: "quantity",
      render: (rc: any) => {
        return (
          <div className=" border-[1px] border-slate-200 rounded-[10px] p-2 text-center">
            จำนวน : {rc}
          </div>
        );
      },
    },

    {
      title: "ลูกค้า",
      dataIndex: "customerName",
    },
    {
      title: "รหัสไปรษณีย์",
      dataIndex: "zipCode",
    },
  ];

  return (
    <>
      <Layout style={{ backgroundColor: "gray" }}>
        <Card
          title={
            <span>
              <RetweetOutlined
                style={{
                  fontSize: "40px",
                  marginRight: "10px",
                }}
              />
              สินค้าถูกนำกลับ
            </span>
          }
          style={{
            margin: "70px",
            height: "570px",
            backgroundColor: "red",
          }}
        >
          <div>
            <Button
              style={{
                backgroundColor: "#979A9C",
                color: "white",
                borderRadius: "17px",
                marginBottom: "15px",
              }}
              icon={
                <RetweetOutlined
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                  }}
                />
              }
            >
              นำกลับเข้าคลังสินค้า
            </Button>
          </div>
          <TableStatus
            status="RETURNED"
            statuschange={statuschange}
            setStatusChange={setStatusChange}
            customColumns={columns}
          />
        </Card>
      </Layout>
    </>
  );
}
export default ReturnPage;
