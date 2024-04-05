import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";

function OutPage() {
  const [statuschange, setStatusChange] = useState<string>("");

  return (
    <Layout style={{ backgroundColor: "gray" }}>
      <Card
        title={<span>กำลังแพ็คของออกจากคลัง</span>}
        style={{ backgroundColor: "pink", margin: "70px" }}
      >
        <TableStatus
          status={"OUTOFSTOCK"}
          changestatus={true}
        />
      </Card>
    </Layout>
  );
}
export default OutPage;
