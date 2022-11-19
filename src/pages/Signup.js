import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export function Signup(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    // check the value of email
    // check if email contains @ and it's not the first character
    if (email.length >= 5 && email.indexOf('@') > 0) {
      setValidEmail(true)
    }
    else {
      setValidEmail(false)
    }
  }, [email])

  useEffect(() => {
    if (password.length >= 8) {
      setValidPassword(true)
    }
    else {
      setValidPassword(false)
    }
  }, [password])

  useEffect(() => {
    if (success) {
      navigate('/')
    }
  }, [success])

  const submitHandler = (event) => {
    // console.log('submit')
    // stop the form from refreshing the page
    event.preventDefault()
    // reset error message
    setError(null)
    // capture data from form
    const data = new FormData(event.target)
    props.handler(data.get("useremail"), data.get("userpw"))
      .then(() => setSuccess(true))
      .catch((error) => {
        //console.log(error)
        handleErrors(error.code)
      })
  }

  const handleErrors = (code) => {
    // turn firebase errors into plain error messages for the visitor
    if ("auth/email-already-in-use") {
      setError("the email is already in use")
    }
  }

  return (
    <div className="container">
      <div className="row">
        {/* Toggle button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="col-md-4 offset-md-4" onSubmit={submitHandler}>
          <h2 className="text-center">Sign up for an account</h2>
          <div className="mb-3">
            <label htmlFor="useremail">Email (valid email address) </label>
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
            <label htmlFor="userpw">Password (minimum 8 characters)</label>
            <input
              type="password"
              id="userpw"
              name="userpw"
              placeholder="you@domain.com"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-outline-danger"
              disabled={(validEmail && validPassword) ? false : true}
            >
              Sign up
            </button>
            <div>{error}</div>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col text-center">
          <Link className="link-danger" to="/signin">Sign in to your account</Link>
        </div>
      </div>
    </div>
  )


}