import { cookies } from 'next/headers';
export const getName = () =>{
    const name = cookies().get("name") || null;
    return name ? name.value : null;
}
export const getRole = () =>{
    const role = cookies().get("role") || null;
    return role ? role.value : null;
}
export const getIsLogin = () =>{
    const isLogin = getName() != null && getRole() != null;
    return isLogin;
}