export default async function fetchUtil(route, options) {
    const res = await fetch(`http://localhost:3000/api${route}`, options || {});

    if(res.status >= 400) {
        const error = await res.text();
        throw new Error(error);
    } else return res;
}