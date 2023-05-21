export default async function fetchUtil(route, options) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${route}`, options || {});

    if(res.status >= 400) {
        const error = await res.text();
        throw new Error(error);
    } else return res;
}