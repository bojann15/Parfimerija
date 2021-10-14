import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from './icons/menu.svg';
import Close from './icons/close.svg';
import Cart from './icons/cart.svg';
import { GlobalContext } from '../../context/globalState';


const Header = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { cart } = useContext(GlobalContext);
    const [menu, setMenu] = useState(false);
    const location = useLocation();
    const logoutUser = async () => {
        localStorage.clear();
        window.location.href = "/";
        setUser(null);
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    useEffect(() => {
        const toggleMenu = () => {
            setMenu(!menu)
        }
        toggleMenu()

    }, [location])

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">{(user?.user?.role === 1) ? "Admin" : "Parfimerija"}</Link>
                </h1>
            </div>
            <ul style={styleMenu}>
                <li><Link to="/">{(user?.user?.role === 1) ? "Products" : "Shop"}</Link></li>
                {(user?.user?.role === 1) && (<>
                    <li><Link to="/create_product">Create Product</Link></li>
                    <li><Link to="/category">Categories</Link></li>
                </>)}
                {
                    (user) ? (<>
                        <li><Link to="/history">History</Link></li>
                        <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                    </>) : <li><Link to="/login" >Login ✥ Register</Link></li>
                }


                <li onClick={() => setMenu(!menu)}><img src={Close} alt="" width="30" className="menu" /></li>

            </ul>
            {(user?.user?.role === 1) ? '' :
                (<div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart"><img src={Cart} alt="" width="30" /></Link>
                </div>)}
        </header>
    )
}
export default Header;