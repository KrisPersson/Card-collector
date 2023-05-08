import "./Header.css"


function Header({ username }: {
    username: string;
}) {

    return (
        <header className="header">
            <h1>Card Collector</h1>
            <section className="header__user-section">
                <h4> { username } </h4>
            </section>
        </header>
    )
}

export default Header
