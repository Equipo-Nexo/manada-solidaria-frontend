import { createElement, type ReactElement } from "react";
import {
  Building,
  Dog,
  DollarSign,
  Garden,
  HandHeart,
  House,
  PawPrint,
  File,
  Users,
  MessageSquare,
  Heart,
  Phone,
} from "@/common/icons";

export const iconsMap: ReadonlyMap<string, ReactElement> = new Map([
  ["Home", createElement(House)],
  ["House", createElement(House)],
  ["Building", createElement(Building)],
  ["Dog", createElement(Dog)],
  ["Garden", createElement(Garden)],
  ["Users", createElement(Users)],
  ["PawPrint", createElement(PawPrint)],
  ["File", createElement(File)],
  ["HandHeart", createElement(HandHeart)],
  ["HeartHandshake", createElement(HandHeart)],
  ["DollarSign", createElement(DollarSign)],
  ["MessageSquare", createElement(MessageSquare)],
  ["Heart", createElement(Heart)],
  ["Phone", createElement(Phone)],
]);
