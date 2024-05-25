export const buildUrl = (url: string, params: { [key: string]: string }) => {
    let urlWithParams = url;

    Object.entries(params).forEach(([key, value], i) => {
        const sign = i === 0 ? "?" : "&";
        urlWithParams += `${sign}${key}=${value}`;
    });

    return urlWithParams;
}