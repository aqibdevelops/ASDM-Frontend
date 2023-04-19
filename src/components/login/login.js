import React from 'react'
import './login.css'

function Login() {
  return (
    <div className='wrapper'>
        <div className='side-section left-section'>
            
        </div>
        <div className='side-section right-section'>
                <div className='login-section'>
                    <div className='login-container'>
                        <form onSubmit={console.log("Submitted")}>
                            <div className='flex-column'>
                                <div className='list-items'><label>Adhaar number</label></div>
                                <div className='list-items'><input></input></div>
                                <div className='list-items'><label>Password</label></div>
                                <div className='list-items'><input></input></div>
                                <div className='list-items'><button>Log in</button></div>
                                <div className='list-items'><a href='#'>Forgot password?</a></div>
                                <div className='list-items'><button>Create new account</button></div>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Login