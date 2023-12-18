import { cookies } from 'next/headers';
const getToken = () =>{
  const token = cookies().get("token").value;
  return token;
}

export default getToken;