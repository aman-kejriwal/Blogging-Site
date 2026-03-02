
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';
// import { Backend_URL, clientId } from '../../config';

// import axios from 'axios';
// export const GoogleAuth = () => {
//     const navigate = useNavigate();
//     return (
//         <GoogleOAuthProvider clientId={clientId}>
//             <GoogleLogin
//                 onSuccess={credentialResponse => {
//                     axios.post(`${Backend_URL}/api/v1/user/google-auth`, {
//                         token: credentialResponse.credential,
//                         clientId: credentialResponse.clientId
//                     }).then((res) => {
//                         localStorage.setItem("token", res.data);
//                         navigate('/blogs');
//                     }).catch((err) => {
//                         alert(err.response.data.error);
//                         console.log(err);
//                     })
//                 }}
//                 onError={() => {
//                     alert("Login Failed2");
//                     console.log('Login Failed2');
//                 }}
//             />
//         </GoogleOAuthProvider>
//     );
// };