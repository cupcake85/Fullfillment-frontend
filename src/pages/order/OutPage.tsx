import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";

function OutPage() {
  const [statuschange, setStatusChange] = useState<string>("");

  return (
    <Layout>
      <Card
        title={<span>กำลังแพ็คของออกจากคลัง</span>}
        style={{ margin: "70px", borderRadius: "20px" }}
      >
        <TableStatus status={"OUTOFSTOCK"} changestatus={true} />
      </Card>
    </Layout>
  );
}
export default OutPage;
