import { useLoaderData } from 'react-router-dom'
import { getRecent } from '../api/product'


export function recentLoader({request : {signal}})
{
    return getRecent({signal})
}

