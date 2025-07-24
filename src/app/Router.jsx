import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../components/Layout';
import Preferences from '../pages/Preferences';
import ProfileDeatil from '../pages/ProfileDetail';
import Error404 from '../pages/Error404'


const Router = () => (
  // <BrowserRouter>
  <Layout>
    <Routes>
      <Route index element={<Home />} />
      <Route path='/preferences' element={<Preferences />} />
      <Route path='/profile-datail' element={<ProfileDeatil />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </Layout>
  // </BrowserRouter> 
);

export default Router;