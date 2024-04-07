import { Card, Layout } from "antd";

const DetailsOrder = () => {
  return (
    <Layout className="  m-[70px]">
      <Card title="รายการ" className=" mb-4"></Card>
      <div className=" flex flex-row justify-between">
        <Card title="สินค้า">สินค้า</Card>
        <Card title="หมายเลขติดตาม">หมายเลขติดตาม</Card>
      </div>
    </Layout>
  );
};

export default DetailsOrder;
