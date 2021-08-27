import { BlockField } from "./blockfield.model";

export class PageField{
    id!: number;
    uuid!: string;
    pageId!: number;
    pageBlockId!: number;
    title!: string;
    dateType!: string;
    sortOrder!: number;
    value!: string;
    blockField?: BlockField;
}