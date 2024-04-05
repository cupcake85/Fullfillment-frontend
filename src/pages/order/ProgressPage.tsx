import React, { useEffect, useState } from "react";
import TableStatus from "../../component/TableStatus";
import { Button, Card, Dropdown, Layout, Space } from "antd";

function ProgressPage() {
  return (
    <Layout>
      <Card title={<span>กำลังดำเนินการ</span>} style={{ margin: "70px" }}>
        <TableStatus status={"INPROGRESS"} changestatus={true} />
      </Card>
    </Layout>
  );
}
export default ProgressPage;
