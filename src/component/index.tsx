import { useEffect, useState } from "react";
import { Button, Card, Layout } from "antd";
import Table from "./table";
import axios from "axios";

const App = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(1);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  useEffect(() => {
    getPokamom();
  }, []);
  useEffect(() => {
    getPokamom();
  }, [current, pageSize]);
  const getPokamom = async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/ability/", {
      params: {
        limit: pageSize,
        offset: current,
      },
    });
    if (res.status === 200) {
      setData(res.data.results);
      setTotal(res.data.count);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  return (
    <Layout>
      <Card>
        <Table
          data={data}
          columns={columns}
          pagination={{ current: current, setCurrent: setCurrent }}
          pageSize={{ pageSize: pageSize, setPageSize: setPageSize }}
          total={total}
        />
      </Card>
    </Layout>
  );
};

export default App;

//ตัวอย่างการใช้
