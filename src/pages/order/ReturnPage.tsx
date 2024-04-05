import { Button, Card, Layout } from "antd";
import React, { useState } from "react";
import Table from "../../component/table";
import { RetweetOutlined } from "@ant-design/icons";

interface DataType {
  details: string;
  date: string;
  address: string;
  zipCode: string;
  cod: string;
  email: string;
}

function ReturnPage() {
  const columns = [
    { title: "รายละเอียด", dataIndex: "details" },
    { title: "ลูกค้า", dataIndex: "name" },
    {
      title: "รหัสไปรษณีย์",
      dataIndex: "age",
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
          <Table
            data={[]}
            columns={columns}
            pagination={{
              current: 0,
              setCurrent: function (value: number): void {
                throw new Error("Function not implemented.");
              },
            }}
            pageSize={{
              pageSize: 0,
              setPageSize: function (value: number): void {
                throw new Error("Function not implemented.");
              },
            }}
            total={0}
            key={""}
          ></Table>
        </Card>
      </Layout>
    </>
  );
}
export default ReturnPage;
