import { useNavigate } from "react-router-dom"

export default function Success() {
    const navigate = useNavigate();

    const backToLogin = () => {
        navigate('/')
    }

    return (
        <div className='align-to-top box'>
            <div className='heading-font row'>Success</div>
            <div className='declaration-padding declaration-font'>
                <div className="row">
                    <div className="heading-font col-sm-12">
                    {sessionStorage.getItem("success_message")}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <button className="next-box" onClick={backToLogin}>Back</button>
                </div>
            </div>
        </div>
    )
}