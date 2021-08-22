
export class Block{
    id!: number;
    uuid!: string;
    title!: string;
    dateCreated!: Date;
    dateModified!: Date;
    parentId!: number;
    blockType!:string;
    canHaveChildren!: boolean;
}