import { House, Building, Dog, Garden, Users, PawPrint, HandHeart, DollarSign, MessageSquare, Heart, Phone, File } from "@/common/icons";
import type { ReactElement } from "react";

export const iconsMap: Map<string, ReactElement> = new Map([
    ['Home', <House />],
    ['Building', <Building />],
    ['Dog', <Dog />],
    ['Garden', <Garden />],
    ['Users', <Users />],
    ['PawPrint', <PawPrint />],
    ['File', <File />],
    ['HandHeart', <HandHeart />],
    ['DollarSign', <DollarSign />],
    ['MessageSquare', <MessageSquare />],
    ['Heart', <Heart />],
    ['Phone', <Phone />],
]);