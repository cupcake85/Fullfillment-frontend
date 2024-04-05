import { Button, Card, Layout, TableProps } from "antd";
import React, { useState } from "react";
import Table from "../../component/table";
import { RetweetOutlined } from "@ant-design/icons";
import TableStatus from "../../component/TableStatus";
import axios from "axios";

interface DataType {
  details: string;
  zipCode: string;
  customerName: string;
}

function ReturnPage() {
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
      <Layout>
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
            // backgroundColor: "red",
          }}
        >
          <TableStatus
            status="RETURNED"
            customColumns={columns}
            statusReturn={true}
          />
        </Card>
      </Layout>
    </>
  );
}
export default ReturnPage;
