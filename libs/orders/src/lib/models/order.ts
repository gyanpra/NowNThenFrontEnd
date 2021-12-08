import { OrderItem } from "./orderitem";
import {User} from "@nownthenfrontend/users";

export class Order {
    id?: string;
    orderItems?: OrderItem[];
    shippingAddress?: string;
    city?: string;
    state?: string;
    PinCode?: string;
    phone?: string;
    status?: number;
    totalPrice?: number;
    user?: string;
    dateOrdered?: Date = new Date();
}