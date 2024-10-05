export type ArticleID = string;
type ArticleInformation = Record<string, number>;

export const inventory: Record<ArticleID, number> = {
    A0001: 12.99,
    A0002: 22.99,
    A0003: 32.99,
}