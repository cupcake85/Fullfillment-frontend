import { Card, Col, Input, Layout, Row } from "antd";
import Column from "antd/es/table/Column";
import React, { useState } from "react";

function Order() {
  return (
    <Layout>
      <Card title={<div>SOL</div>}>
        <Row>
          <Col span={5}>
            <p>ร้านค้า</p>
            <p>รหัสใบสั่งของ</p>
            <p>ชื่อร้านค้า</p>
            <p>ระยะเวลา</p>
            <p>แขวง/ตำบล</p>
            <p>รหัสไปรษณี</p>
            <p>ค่าส่งปลายทางต่ำสุด</p>
            <p>เรียงค่าส่งปลายทาง</p>
          </Col>
          <Col span={7}>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
          </Col>
          <Col span={5}>
            <p>รหัสสินค้า</p>
            <p>สถานะใบสั่งของ</p>
            <p>เบอร์โทรศัพท์</p>
            <p>เขต/อำเภอ</p>
            <p>จังหวัด</p>
            <p>เก็บเงินปลายทาง</p>
            <p>ค่าเก็บเงินปลายทางสูงสุด</p>
            <p>ระยะทาง</p>
          </Col>
          <Col span={7}>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
            <Input></Input>
          </Col>
        </Row>
        <Row>
          <p>บริการจัดส่ง</p>
        </Row>
      </Card>
    </Layout>
  );
}
export default Order;
