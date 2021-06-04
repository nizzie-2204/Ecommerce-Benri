import "./App.css";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Shop from "./components/Shop";
import ShoppingCart from "./components/ShoppingCart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Product from "./components/Admin/Product";
import Accouts from "./components/Admin/Accouts";
import CustomerAuthLoginProvider from "./contexts/Customer/CustomerAuthLogin";
import AdminAuthLoginProvider from "./contexts/Admin/AdminAuthLogin";
import CustomerAuthRegister from "./contexts/Customer/CustomerAuthRegister";
import CustomerEditProfile from "./contexts/Customer/CustomerEditProfile";
import AdminLogin from "./components/Admin/AdminLogin";
import Caterogy from "./components/Admin/Caterogy";
import Admin from "./components/Admin/Admin";
import UserPurchasedOrders from "./components/UserPurchasedOrders";
import UserProfile from "./components/UserProfile";
import ProductContextProvider from "./contexts/ProductContext/ProductContext";
import OrderAdminContextProvider from "./contexts/Admin/OrderAdminContext";
import ProductAdminContextProvider from "./contexts/Admin/ProductAdminContext";
import AccountAdminContextProvider from "./contexts/Admin/AccountAdminContext";
import OrderContextProvider from "./contexts/Order/OrderContext";
import CartItemsProvider from "./contexts/CartItems/CartItems";
import ProductDetail from "./components/ProductDetail";
import Order from "./components/Order";
import MyOrder from "./components/MyOrder";
import OrderAdmin from "./components/Admin/OrderAdmin";

import { createPack } from "react-component-pack";
const ProviderPack = createPack(
	AdminAuthLoginProvider,
	CustomerAuthRegister,
	CustomerAuthLoginProvider,
	ProductContextProvider,
	CustomerEditProfile,
	CartItemsProvider,
	OrderContextProvider,
	OrderAdminContextProvider,
	ProductAdminContextProvider,
	AccountAdminContextProvider
);

function App() {
	return (
		<>
			<ProviderPack>
				<Router>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/shop" exact component={Shop} />
						<Route path="/contact" exact component={Contact} />
						<Route path="/cart" exact component={ShoppingCart} />
						<Route path="/register" exact component={Register} />
						<Route path="/login" exact component={Login} />
						<Route path="/order" exact component={Order} />
						<Route path="/my-order" exact component={MyOrder} />
						<Route
							path={`/user/purchase/:username`}
							exact
							component={UserPurchasedOrders}
						/>
						<Route
							path={`/user/profile/:username`}
							exact
							component={UserProfile}
						/>
						<Route
							path={`/product-detail/:id`}
							exact
							component={ProductDetail}
						/>
						{/* Admin */}
						<Route path="/admin/login" exact component={AdminLogin} />
						<Route path="/admin" exact component={Admin} />
						<Route path="/admin/order" exact component={OrderAdmin} />
						<Route path="/admin/accounts" exact component={Accouts} />
						<Route path="/admin/products" exact component={Product} />
						<Route path="/admin/category" exact component={Caterogy} />
					</Switch>
				</Router>
			</ProviderPack>
		</>
	);
}

export default App;
