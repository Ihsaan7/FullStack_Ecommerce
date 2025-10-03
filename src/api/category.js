import { baseApi } from "./base";

export function getCategory(option)
{
    return baseApi.get("categories" , option)
    .then(res => res.data)
    
    
}
