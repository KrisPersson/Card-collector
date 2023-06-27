import "./Header.scss"
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
                    <li className="nav__li"><Link className='nav__link' to='/inventory'>Card Inventory</Link></li>
                </ul>   
            </nav>
            <section className="header__user-section">
                <i className="fa-solid fa-user"></i>
                <h4> { username } </h4>
            </section>
        </header>
    )
}

export default Header
