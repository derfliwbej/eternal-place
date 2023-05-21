export default async function fetchUtil(route, options) {
    const res = await fetch(`api${route}`, options || {});

    if(res.status >= 400) {
        const error = await res.text();
        throw new Error(error);
    } else return res;
}