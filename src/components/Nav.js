import {NavLink} from 'react-router-dom';

//stateless component that displays linked buttons as shown in router redirect course
const Nav = (props) => {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to='/coral'>Coral</NavLink></li>
                <li><NavLink to='/javascript'>JavaScript</NavLink></li>
                <li><NavLink to='/ocean'>Ocean</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav;