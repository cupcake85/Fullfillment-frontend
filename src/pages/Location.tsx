import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Select } from "antd";
import CustomTable from "../component/table";
import { ColumnsType } from "antd/es/table";

const Location = () => {
  const columns: ColumnsType<Record<string, unknown>> = [
    {
      title: "",
      dataIndex: "",
      align: "center",
    },
    {
      title: "จังหวัด",
      dataIndex: "",
      align: "center",
    },
    {
      title: "รหัสไปรษณี",
      dataIndex: "",
      align: "center",
    },
    {
      title: "จัดการ",
      dataIndex: "",
      align: "center",
    },
  ];

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  };

  return (
    <Card
      title={<span style={{ fontFamily: "kanit" }}>พื้นที่</span>}
      style={{ margin: 70 }}
    >
      <div>
        <Row style={{ marginBottom: 30 }}>
          <div
            style={{
              width: "17vw",
              height: "5vh",
              backgroundColor: "#2F353A",
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              borderRadius: "20px",
              fontSize: 16,
              marginLeft: 15,
            }}
          >
            <div>BKK Zone</div>
            <DownOutlined />
          </div>
          {/* <Select
            defaultValue="BKK Zone"
            style={{
              width: "17vw",
              height: "5vh",
              backgroundColor: "#2F353A",
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              borderRadius: "20px",
              fontSize: 16,
              marginLeft: 15,
            }}
            onChange={handleChange}
            options={[{ value: "BKK Zone", label: "BKK Zone" }]}
          /> */}
        </Row>
        <Row style={{ marginBottom: 30 }}>
          <Col
            span={12}
            style={{
              fontFamily: "kanit",
              // backgroundColor: "red",
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyItems: "baseline",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div>จังหวัด</div>
              <Input placeholder="100743" style={{ width: "20vw", borderRadius: "30px" }}></Input>
            </div>

            <div
              style={{
                display: "flex",
                justifyItems: "baseline",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>แขวง / ตำบล</div>
              <Input placeholder="MIKCOCIN" style={{ width: "20vw", borderRadius: "30px" }}></Input>
            </div>
          </Col>

          <Col
            span={12}
            style={{
              fontFamily: "kanit",
              // backgroundColor: "red",
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyItems: "baseline",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div>เขต / อำเภอ</div>
              <Input placeholder="test_boat" style={{ width: "20vw", borderRadius: "30px" }}></Input>
            </div>

            <div
              style={{
                display: "flex",
                justifyItems: "baseline",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>รหัสไปรษณี</div>
              <Input placeholder="test_boat" style={{ width: "20vw", borderRadius: "30px" }}></Input>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <Button
            style={{
              backgroundColor: "#2F353A",
              color: "#FFFFFF",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              justifyItems: "baseline",
              width: "6vw",
            }}
          >
            <SearchOutlined />
            <div>ค้นหา</div>
          </Button>
        </Row>
      </div>
      <div>
        <Row>
          <Col
            span={12}
            style={{
              fontFamily: "kanit",
              // backgroundColor: "red",
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <CustomTable
              key={""}
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
            ></CustomTable>
          </Col>

          <Col
            span={12}
            style={{
              fontFamily: "kanit",
              // backgroundColor: "red",
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <CustomTable
              key={""}
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
            ></CustomTable>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default Location;
