import './CheffClaude.css'
import cheffLogo from '../assets/images/chef-claude-icon.png'

export default function Header() {
    return (
        <header>
            <div className="header-container">
                <img src={cheffLogo} alt="Cheff logo" className="cheff-logo"></img>
                <span className="chef-header-text">Chef Claude</span>
            </div>
        </header>
    )
}
