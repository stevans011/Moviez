import { useState } from "react";

export function Profile(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const handleEmail = () => {
    if (updating) return;
    if (email) {
      // update email
      setUpdating(true);
      props
        .updateEmail(props.auth, email)
        .then(() => {})
        .catch((err) => {
          // console.log(err)
          setError("Logout and login again to perform this action!");
        })
        .finally(() => {
          setUpdating(false);
        });
    }
  };

  const handlePassword = () => {
    if (updating) return;
    if (password !== confirm || password === "") {
      setError("Password and confirm password is not matched!");
      return;
    }
    setUpdating(true);
    props
      .updatePassword(props.auth, password)
      .then(() => {})
      .catch(() => {
        setError("Logout and login again to perform this action!");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h2 className="text-center mt-4">Update your profile</h2>
          {error ? <p className="text-center mt-3 text-white bg-danger rounded py-1">{error}</p> : null}
          <div className="mb-3">
            <label htmlFor="email">Current Email</label>
            <input
              type="email"
              id="original_email"
              name="original_email"
              placeholder="you@domain.com"
              className="form-control"
              value={props?.auth?.email || ''}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">New Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@domain.com"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-outline-danger" onClick={handleEmail}>
              {updating ? "Updating" : "Update email"}
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm">Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="********"
              className="form-control"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-outline-danger" onClick={handlePassword}>
              {updating ? "Updating" : "Update password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
