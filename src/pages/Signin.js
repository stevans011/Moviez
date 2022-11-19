import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom"

export function Signin(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success,setSuccess] = useState(false)

  const navigate = useNavigate()

  useEffect( () => {
    if( success ) { navigate('/') }
  })

  const submitHandler = (event) => {
    // console.log('submit')
    // stop the form from refreshing the page
    event.preventDefault()
    // reset error message
   
    // capture data from form
    const data = new FormData(event.target)
    props.handler(data.get("useremail"), data.get("userpw"))
      .then(() => setSuccess(true) )
      .catch((error) => {
        //console.log(error)
      
      })
  }

  return (
    <div className="container">
      <div className="row">
        <form className="col-md-4 offset-md-4" onSubmit={submitHandler} >
          {/* Toggle button */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <h2 className="text-center">Sign in to your account</h2>
          <div className="mb-3">
            <label htmlFor="useremail">Email </label>
            <input
              type="email"
              id="useremail"
              name="useremail"
              placeholder="you@domain.com"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userpw">Password</label>
            <input
              type="password"
              id="userpw"
              name="userpw"
              placeholder="you@domain.com"
              className="form-control"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-outline-danger"
            >
             Sign in
            </button>
            
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col text-center">
          <Link className="link-danger" to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  )
}