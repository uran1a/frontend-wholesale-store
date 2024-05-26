export const buildUrl = (url: string, params: SearchParams) => {
    let urlWithParams = url;

    Object.entries(params).forEach(([key, value], i) => {
        const sign = i === 0 ? "?" : "&";
        urlWithParams += `${sign}${key}=${value}`;
    });

    console.log(urlWithParams);

    return urlWithParams;
}

export const sumBy = (arr: number[]) => arr.reduce((prev, cur) => prev + cur, 0);