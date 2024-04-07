import { Button, Card, Layout, Pagination, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface TableProps {
  data: Record<string, unknown>[]; // ปรับตามโครงสร้างข้อมูลที่จะแสดงในตาราง
  columns: ColumnsType<Record<string, unknown>>; // ชื่อคอลัมน์ของตารางและชื่อฟิลด์ข้อมูล
  pagination: {
    current: number;
    setCurrent: (value: number) => void;
  };
  pageSize: {
    pageSize: number;
    setPageSize: (value: number) => void;
  };
  total: number;
  key: string;
}

const CustomTable: React.FC<TableProps> = ({
  data,
  columns,
  pagination,
  pageSize,
  total,
}) => {
  const formatCol = columns.map((item) => ({
    // title: item.title,
    // dataIndex: item.dataIndex,
    // key: item.dataIndex,
    ...item,
    align: "center",
    width: "100vw",
  })) as ColumnsType<Record<string, unknown>>;

  const onChange = (p: number, s: number) => {
    pageSize.setPageSize(s);
    pagination.setCurrent(p);
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={formatCol}
        pagination={false}
        size={"middle"}
        rowKey="id" //กำหนด unique key ให้เป็น id
      />

      <Pagination
        current={pagination.current}
        total={total}
        onChange={(p, s) => onChange(p, s)}
        pageSize={pageSize.pageSize}
      />
    </>
  );
};
export default CustomTable;

//ห้ะ
