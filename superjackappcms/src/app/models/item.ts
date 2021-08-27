import { UUID } from "angular2-uuid";

export class Item {
    name: string;
    uId: string;
    children: Item[];

    constructor(options: {
        name: string,
        children?: Item[]
    }) {
        this.name = options.name;
        this.uId =UUID.UUID();
        this.children = options.children || [];
    }
}