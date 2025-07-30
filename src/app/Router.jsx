import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Error404 from '../pages/Error404';
import Splash from '../pages/Splash';
import Login from '../pages/Login';
import Preferences from '../pages/Preferences';
import ProfileDetail from '../pages/ProfileDetail';
import UserMeasurents from '../pages/UserMeasurements';
import Home from '../pages/Home';
import Profile from '../pages/Profile'
import Calendary from '../pages/Calendary';
import AddGarment from '../pages/AddGarment';
import Comunidad from '../pages/Community';





const Router = () => (
  // <BrowserRouter>
  <Layout>
    <Routes>
      <Route index element={<Home />} />
      <Route path='/splash' element={<Splash />} />
      <Route path='/login' element={<Login />} />
      <Route path='/preferences' element={<Preferences />} />
      <Route path='/profile-detail' element={<ProfileDetail />} />
      <Route path='/user-measurements' element={<UserMeasurents />} />

      {/** HOME NAVBAR */}
      <Route path='/profile' element={<Profile />} />
      <Route path='/calendary' element={<Calendary />} />
      <Route path='/add-garment' element={<AddGarment />} />
      <Route path='/Comunidad' element={<Comunidad />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  </Layout>
  // </BrowserRouter>
);


export default Router;