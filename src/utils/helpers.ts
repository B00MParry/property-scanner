import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))

export const routerQueryToString = (queryParam: string | string[] | undefined) => {
    if (queryParam === undefined || queryParam[0] === undefined) {
        return null;
    }
    if (Array.isArray(queryParam)) {
        return queryParam[0].replaceAll("+", " ");
    }
    return queryParam;
};

export const clearFieldIfFalsey = (value: number | null) => (value === null || value === 0) ? "" : value

