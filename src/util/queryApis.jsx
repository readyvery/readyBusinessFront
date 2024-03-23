import { useQuery } from "react-query"
import commonApis from "./commonApis"

export const QueryApis = (url) => {
    const { isLoading, data, isError, error } = useQuery('get-product', () => {
      return commonApis.get(url)
    })

    console.log(data);
    if(isLoading) {console.log('로딩중');}
    if(isError) {console.log(error);}
    return {isLoading, data, isError, error};
}