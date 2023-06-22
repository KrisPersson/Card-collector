import "./Header.css"
import { Link } from 'react-router-dom'



function Header({ username }: {
    username: string;
}) {

    return (
        <header className="header">
            <h1>Card Collector</h1>
            <nav>
                <ul>
                    <li className="nav__li"><Link className='nav__link' to='/checklist'>Checklists</Link></li>
                </ul>   
            </nav>
            <section className="header__user-section">
                <h4> { username } </h4>
            </section>
        </header>
    )
}

export default Header
