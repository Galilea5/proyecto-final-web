const getData = async (url, info) => {
    let data, isPending, Error;

    try {
        let res = await fetch(url, {
            method: "POST",
            body: info,
            mode: "cors",
        }),
            jsonResponse = await (res.ok ? res.json() : Promise.reject(res));

        data = jsonResponse;
        isPending = false;
        Error = { err: false };
    } catch (err) {
        console.log(err);
        isPending = true;
        Error = {
            err: true,
            status: err.status,
            statusText: err.statusText || "Ocurrió un Problema",
        };
    }

    return { data, isPending, Error };
};

export default getData;