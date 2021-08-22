import { PageSearchComparisonQuery } from "./pagesearchcomparisonquery.model";

export class PageSearchFilter{
    pageIdentifier!: PageSearchComparisonQuery;
    parentPageIdentifier!: PageSearchComparisonQuery;
    level!: number;
    dateScheduledPublished!: PageSearchComparisonQuery;
    dateScheduledExpiry!: PageSearchComparisonQuery;
    siteId!: number;
    draft!: boolean;
    published!: boolean;
    disabled!: boolean;
    binned!: boolean;
}