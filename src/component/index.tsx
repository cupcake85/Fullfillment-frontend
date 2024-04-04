import React from "react";
import TableComponent from "./TableStatus";
import { Card, Layout } from "antd";
import Table from "./table";
import axios from "axios";

const TableStatus = () => {
  const data = [
    {
      key: "1",
      details: "Details 1",
      date: "2024-04-01",
      address: "Address 1",
      zipCode: "10000",
      cod: "COD 1",
      email: "email1@example.com",
      status: "Pending",
    },
    {
      key: "2",
      details: "Details 2",
      date: "2024-04-02",
      address: "Address 2",
      zipCode: "20000",
      cod: "COD 2",
      email: "email2@example.com",
      status: "Completed",
    },
  ];

  return <TableComponent status={""} />;
};

export default TableStatus;
