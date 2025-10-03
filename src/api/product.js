import { baseApi } from "./base";

export function getRecent(options)
{
    return baseApi.get("products" , options )
    .then(res => res.data)
}
