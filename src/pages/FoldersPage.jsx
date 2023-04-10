import React from "react";
import Content from "../components/Content";
import useGetLocation from "../hooks/useGetLocation";

export default function FoldersPage() {
  const option = useGetLocation();
  return <Content option={option} />;
}
