import { Link } from 'react-router-dom';

export default function Header() {
    const pages = [
        { title: 'Home Page', path: '/' },
    ]

    return (
        <>
            <nav className="header-nav">
                <ul className="header-list">
                    {pages.map((page, index) => (
                        <li key={index}>
                            <Link to={page.path}>{page.title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}