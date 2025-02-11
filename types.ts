
import { Card,List } from "@prisma/client";
export type ListWtihCard=List & {cards:Card[]}
export type CardWithList =Card & {list :List}