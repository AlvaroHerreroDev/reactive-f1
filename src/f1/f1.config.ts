export type Season = number|null;

export const availableSeasons: Season[] = [...Array(5).keys()].map((i, index) => 2018 + index);

export const defaultMaxItems = 10;
export const paginationOptions = [10, 15, 25];
