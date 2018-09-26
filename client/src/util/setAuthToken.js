import axios from "axios";

const setAuthenToken = (token) =>{
    if(token){
     axios.defaults.headers.common['Authorization'] = token
    }else{
     delete axios.defaults.headers.common['Authorization']
    }
}


export default setAuthenToken;