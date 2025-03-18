import { apiSlice } from '../services/apiSlice';
import { useNavigate } from 'react-router-dom';

const tokenExpirationMiddleware = () => (next) => async (action) => {
//  console.log(action.error)
// console.log(action.type.startsWith(apiSlice.reducerPath))
if(action?.payload?.status && action.error){
  // console.log('click')
}

  if (action.type.startsWith(apiSlice.reducerPath) && action.error && action.payload?.status === 401) {
    
    // console.log('click')
    // console.log(action?.payload?.status)
    const errorMessage =action?.payload?.status ;
    // console.log('click')// Assuming the server provides a message field in the response
    if (errorMessage === 401) {
      // console.log('click')
      // Redirect to the sign-in page
      const navigate = useNavigate()
      navigate('/signin');
    }
  }

  return next(action);
};

export default tokenExpirationMiddleware;
