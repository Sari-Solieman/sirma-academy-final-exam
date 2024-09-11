import { Link } from 'react-router-dom';

export default function Header() {
   
    return (
        <>
            <nav className="header-nav">
                <Link to='/'>
                    <img className='logo' src="/assets/logo.png" />
                </Link>
            </nav>
        </>
    );
}