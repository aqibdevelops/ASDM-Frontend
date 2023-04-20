import './header-footer.css'
import logo from '../indian.png'

export default function Header () {
    return(
        <div className="header-style row">
            <img style={{ width: 50, height: 50 }} className='photo' src={logo} alt=''/>
            <div className='font-header-1 text-center'>ASSAM SKILL DEVELOPMENT MISSION</div>
            <div className='font-header-2 text-center'>Government Of Assam</div>

        </div>
    )
}