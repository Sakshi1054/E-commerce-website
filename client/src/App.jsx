import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminOrders from './pages/admin-view/orders';
import AdminFeatures from './pages/admin-view/features';
import AdminProducts from './pages/admin-view/products';
import ShoppingLayout from './components/shopping-view/layout';
import NotFound from './pages/not-found';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingAccount from './pages/shopping-view/account';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingListing from './pages/shopping-view/listing';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page';

function App() {

  const isAuthenticated = false;
  const user = null;

  return (
    <div>
      <Routes>
        <Route path="/auth" element = {
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/> {/*this is childern in checkout.jsx*/}
          </CheckAuth>
          }>
          <Route path="login" element = {<AuthLogin/>}/>
          <Route path="register" element = {<AuthRegister/>}/>
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout/> {/*this is childern in checkout.jsx*/}
        </CheckAuth>
        }>
          <Route path="dashboard" element = {<AdminDashboard/>}/>
          <Route path="orders" element = {<AdminOrders/>}/>
          <Route path="features" element = {<AdminFeatures/>}/>
          <Route path="products" element = {<AdminProducts/>}/>
        </Route>

        <Route path="/shop" element = {
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout/> {/*this is childern in checkout.jsx*/}
        </CheckAuth>
        }>
          <Route path="home" element = {<ShoppingHome/>}/>
          <Route path="account" element = {<ShoppingAccount/>}/>
          <Route path="checkout" element = {<ShoppingCheckout/>}/>
          <Route path="listing" element = {<ShoppingListing/>}/>
        </Route>

        <Route path="*" element = {<NotFound/>}></Route>
      /<Route path="/unauth-page" element = {<UnauthPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
