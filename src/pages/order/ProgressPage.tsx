import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";

function ProgressPage() {
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
            กำลังดำเนินการ
          </span>
        }
        style={{
          backgroundColor: "white",
          margin: 65,
          borderRadius: 20,
          marginTop: "40px",
        }}
      >
        <TableStatus status={"INPROGRESS"} changestatus={true} />
      </Card>
    </Layout>
  );
}
export default ProgressPage;
