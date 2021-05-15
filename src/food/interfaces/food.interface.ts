import { Store } from "src/store/store.entity";

export interface iFoodResponse {
    id: string;
    name: string;
    price: number;
    img: string;
    status: boolean;
    idStore: string;
    nameStore: string;
}