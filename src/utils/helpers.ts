export const routerQueryToString = (queryParam: string | string[] | undefined) => {
    if (queryParam === undefined) {
        return null;
    }
    if (Array.isArray(queryParam)) {
        return queryParam[0]?.replaceAll("+", " ");
    }
    return queryParam;
};