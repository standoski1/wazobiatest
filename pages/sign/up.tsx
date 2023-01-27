import React, { useState } from 'react'
import Link from 'next/link'
import { axiosInstance } from '../../utils/axios'
import { useRouter } from 'next/router'

export default function Register() {
    const [userData, setuserData] = useState({
        username:'',
        password:'',
        password2:'',
        email:''
    })
    const [passwordError, setPasswordError] = useState(false)
    const [usernameError, setusernameError] = useState(false)
    const [emailError, setemailError] = useState(false)
    const router = useRouter()



    const handleSignUp = async()=>{
     const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

     if (userData.username.trim().length === 0) {
        setusernameError(true)
     }else if (!userData.email.match(validEmail)) {
        setemailError(true)
        setusernameError(false)
     }else if (userData.password.trim().length === 0 || userData.password !== userData.password2) {
        setPasswordError(true)
        setemailError(false)
        setusernameError(false)
     }else{
        setPasswordError(false)
        setemailError(false)
        setusernameError(false)
        await axiosInstance.post('api/createuser',{userData}).then((res)=>{
            router.push('/sign/in')
        }).catch((err)=>{
            console.log(err.message);
        })
     }
    }


  return (
    <section style={{backgroundColor:'#ebfafa'}}>
    <div className="container py-5 vh-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
            <div className="card card-registration my-4" >
            <div className="row g-0">
                
                <div className="col-xl-6">
                <div className="card-body p-md-5 text-black">
                    <h3 className="mb-3 text-uppercase">registration form</h3>

                    <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-outline">
                        <input onChange={(e)=>setuserData({...userData, username:e.target.value})} type="text" placeholder='Username' className="form-control form-control-lg" />
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-outline">
                        <input onChange={(e)=>setuserData({...userData, email:e.target.value})} type="email" placeholder='Email' className="form-control form-control-lg" />
                        </div>
                    </div>
                    </div>

                    <div className="row">
                    
                    <div className="col-md-6 mb-4">
                        <div className="form-outline">
                        <input onChange={(e)=>setuserData({...userData, password:e.target.value})} type="password" placeholder='Password' className="form-control form-control-lg" />
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline">
                        <input onChange={(e)=>setuserData({...userData, password2:e.target.value})} type="password" placeholder='Confirm Password' className="form-control form-control-lg" />
                        </div>
                    </div>
                    </div>
                    {passwordError &&
                    <p style={{color:'red'}}>password do not match or empty password*</p>
                    }
                    {usernameError &&
                    <p style={{color:'red'}}>username is required*</p>
                    }
                    {emailError &&
                    <p style={{color:'red'}}>email is not valid*</p>
                    }
                    
                    <div className="d-flex justify-content-end pt-3">
                    <button onClick={handleSignUp} type="button" className="btn btn-success btn-md ms-2">Register</button>
                    </div>
                    <p className="text-center text-muted mt-3 mb-3">already have an account? <Link href="/sign/in" className="fw-bold text-body">Login here</Link></p>

                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
  )
}
