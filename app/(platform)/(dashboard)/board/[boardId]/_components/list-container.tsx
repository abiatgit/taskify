"use client";
import { useState, useEffect } from "react";
import { ListItem } from "./list-item";
import { ListWtihCard } from "@/types";
import ListForm from "./list-form";
interface ListContainerProp {
  data: ListWtihCard[];
  boardId: string;
}
export const ListContainer = ({ data, boardId }: ListContainerProp) => {
  const [orderedData, setOrderdData] = useState(data);
  useEffect(() => {
    setOrderdData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list}></ListItem>;
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
