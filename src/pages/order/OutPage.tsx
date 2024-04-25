import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";

function OutPage() {
  const [statuschange, setStatusChange] = useState<string>("");

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
            กำลังแพ็คของออกจากคลัง
          </span>
        }
        style={{
          backgroundColor: "white",
          margin: 65,
          borderRadius: 20,
          marginTop: "40px",
        }}
      >
        <TableStatus status={"OUTOFSTOCK"} changestatus={true} />
      </Card>
    </Layout>
  );
}
export default OutPage;
