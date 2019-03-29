import axios from 'axios';
import queryString from 'query-string';
const config = {
  headers: {
    'Authorization' : 'Bearer keyA7EKdngjou4Dgy',
    'Content-Type': 'application/json;charset=UTF-8',
  },
}
// Api docs, http://www.amiiboapi.com/
export const fetchGetCharacterList = (payload) => axios.get(`https://reqres.in/api/users?${queryString.stringify(payload)}`, config)
export const fetchPostUser = (payload) => axios.post('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Student?view=Grid%20view', payload, config)