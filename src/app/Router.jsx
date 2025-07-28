import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../components/Layout';
import Preferences from '../pages/Preferences';
import ProfileDeatil from '../pages/ProfileDetail';
import Login from '../pages/Login';
import Splash from '../pages/Splash';
import Error404 from '../pages/Error404'




const Router = () => (
  // <BrowserRouter>
  <Layout>
    <Routes>
      <Route index element={<Home />} />
      <Route path='/splash' element={<Splash />} />
      <Route path='/login' element={<Login />} />
      <Route path='/preferences' element={<Preferences />} />
      <Route path='/profile-datail' element={<ProfileDeatil />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  </Layout>
  // </BrowserRouter>
);


export default Router;