import TableStatus from "../../component/TableStatus";
import { Card,Layout} from "antd";

function OutPage() {

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
