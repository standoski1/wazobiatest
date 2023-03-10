import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {Row,Col,Card,Navbar,Container,Nav,Button,Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { tokenInstance } from '../utils/axios'
import styles from '../styles/Home.module.css'
import absoluteUrl from 'next-absolute-url'
import { logoutUser } from '../redux/userSlice'

export default function SIngle() {
  // @ts-ignore
  const {accessToken} = useSelector(state => state.user)
  const router = useRouter()
  const [show, setShow] = useState(false);
  const [Note, setNote] = useState({
    title:'',text:'',date:'',_id:''
  })
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {id} = router.query
  const { asPath } = useRouter();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${asPath}`;
  const dispatch = useDispatch()

  useEffect(() => {
     if (!accessToken) {
      router.push('/sign/in')
     }
  }, [accessToken])

  useEffect(() => {
    fetchAllPost()
  }, [])
  
  const fetchAllPost = async()=>{
    await tokenInstance(accessToken).patch('api/post',{id}).then((res)=>{
      setNote({title:res.data.title, text:res.data.text, date:res.data.createdAt,_id:res.data._id})
    }).catch((err)=>{
      console.log(err.message)
    }) 
  }


  const UpdateNote = async()=>{
    await tokenInstance(accessToken).put(`api/post?id=${id}`, {Note}).then((res)=>{
      handleClose()
      setNote({title:res.data.title, text:res.data.text, date:res.data.createdAt,_id:res.data._id})
    }).catch((err)=>{
      console.log(err.message)
    })
  }

  const handleDelete = async(id:string)=>{
    await tokenInstance(accessToken).delete(`api/post?id=${id}`).then((res)=>{
      router.push('/')
    }).catch((err)=>{
      console.log(err.message)
    })
  }

  const copyToClipBoard = async (copyMe:any) => {
    await navigator.clipboard.writeText(copyMe);
    alert('copied')
  };
  

  if (accessToken) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar bg="light" style={{padding:'5px 15px',marginBottom:'2rem'}}>
        <Navbar.Brand>Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link href='/' style={{textDecoration:'none'}}>Home</Link></Nav.Link>
            <Nav.Link onClick={()=>dispatch(logoutUser())}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>

    <Container>

      <Button onClick={handleShow} size='sm' variant='success' style={{marginBottom:'1.5rem'}}>edit Note</Button>&nbsp;&nbsp;
      <Button onClick={()=>handleDelete(Note._id)} size='sm' variant='danger' style={{marginBottom:'1.5rem'}}>delete Note</Button>

      <Card style={{padding:'10px'}}>
        <h4>{Note.title}</h4>
        <p style={{fontSize:'13px',color:'#8f8c8c'}}>{moment(Note.date).format("MMM Do YYYY")}</p>
        <p>{Note.text}</p><br />
        <p onClick={() => copyToClipBoard(URL)} style={{color:'blue',cursor:'pointer'}}>share note</p>
      </Card>
      
    </Container>



    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input value={Note.title} onChange={(e)=>setNote({...Note,title:e.target.value})} type="text" className='form-control' placeholder='add title'/><br />
        <textarea value={Note.text} onChange={(e)=>setNote({...Note,text:e.target.value})} placeholder='create note' className='form-control' cols={30} rows={5}></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={UpdateNote}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

    </div>
  )
  }
}
