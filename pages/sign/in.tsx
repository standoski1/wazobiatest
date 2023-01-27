import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/userSlice'
import { axiosInstance } from '../../utils/axios'

export default function Login() {
    const [userData, setuserData] = useState({
        username:'',
        password:'',
    })
    const dispatch = useDispatch()
    const router = useRouter()
    // @ts-ignore
    const {accessToken} = useSelector(state => state.user)


    useEffect(() => {
        if (accessToken) {
        router.push('/')
        }
    }, [accessToken])


    const handleLogin = async()=>{
      await axiosInstance.post('api/loginuser', {userData}).then((res)=>{
        dispatch(loginUser(res.data))
      }).catch((err)=>{
        console.log(err.message);
      })
    }


  return (
    <section className="vh-100" style={{backgroundColor:' #eee',marginBottom:'-30px'}}>
    <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius:'25px',marginTop:'15px',marginBottom:'15px'}}>
            <div className="card-body p-md-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4">Welcome Back</p>

                <form className="mx-1 mx-md-4">

                    <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fa fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                        <input onChange={(e)=>setuserData({...userData,username:e.target.value})} type="text" placeholder='Enter your username' className="form-control" />
                    </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fa fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                        <input onChange={(e)=>setuserData({...userData,password:e.target.value})} type="password" placeholder='Enter Your Password' className="form-control" />
                    </div>
                    </div>


                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button onClick={handleLogin} type="button" className="btn btn-primary btn-lg">LogIn</button>
                    </div>

                    <p className="text-center text-muted mt-3 mb-3">Don&apos;t Have an account? <Link href="/sign/up" className="fw-bold text-body">Register here</Link></p>


                </form>

                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image"/>

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
