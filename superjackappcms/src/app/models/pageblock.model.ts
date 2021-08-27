import { Block } from "./block.model";
import { PageField } from "./pagefield.model";

export class PageBlock{
    id!: number;
    uuid!: string;
    pageId!: number;
    blockId!: number;
    parentId!: number;
    sortOrder!: number;
    level!: number;
    block!: Block;
    children!: PageBlock[];
    fields!: PageField[];
}