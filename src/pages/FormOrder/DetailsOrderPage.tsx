import { Card, Layout } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DetailsOrder = () => {
  const location = useLocation();
  let { id } = location.state;
  const [detail, setDetail] = useState([]);
  console.log("detail จาก setDetail ->", detail);

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  const getDetail = async () => {
    try {
      const response = await axios.get("http://192.168.2.57:3000/orders/" + id);
      const detailData = response.data.data;
      setDetail(detailData);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <Layout className="  m-[70px]">
      <Card title="รายการ" className=" mb-4">
        {JSON.stringify(detail)}
      </Card>
      <div className=" flex flex-row justify-between">
        <Card title="สินค้า">สินค้า</Card>
        <Card title="หมายเลขติดตาม">หมายเลขติดตาม</Card>
      </div>
    </Layout>
  );
};

export default DetailsOrder;
