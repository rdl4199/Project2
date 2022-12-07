const helper = require('./postHelper.js')

const handleLogin = (e) => {
    console.log("fired");
    e.preventDefault();
    //helper.hideError();

    
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
  //  const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass) {
        //helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass});
    return false;
}

const handleSignup = (e) => {
    e.preventDefault();
   // helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
  // const _csrf = e.target.querySelector('#_csrf').value;
   console.log("THIS HIS HPAENNIN")
    if (!username || !pass || !pass2) {
        //helper.handleError('All fields are required');
        return false;
    }
    if (pass !== pass2) {
        //helper.handleError('Passwords do not match!');
        return false;
    }
    
    helper.sendPost(e.target.action, { username, pass, pass2 });
    return false;
}

const handleChange = (e) => {
    e.preventDefault();
   // helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
  //  const _csrf = e.target.querySelector('#_csrf').value;
    if (!username || !pass || !pass2) {
        //helper.handleError('All fields are required');
        return false;
    }
    // if (pass !== pass2) {
    //     //helper.handleError('Passwords do not match!');
    //     return false;
    // }
    
    helper.sendPost(e.target.action, { username, pass, pass2 });
    return false;
}

const UserLogin = (props) => {
    return(
        <div className="card mt-5">
            <div className="card-header bg-primary text-white">
            Login
            </div>
            <div className="card-body">
            <form id="editForm"
            onSubmit={handleLogin}
            name="loginForm"
            action="/login"
            method="POST">
                <input className="form-control" id="user" type="text" name="username" placeholder="username" />
                <br></br>
                <input className="form-control" id="pass" type="password" name="pass" placeholder="password" />
                <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                <input className="btn btn-primary mt-2 float-end" type="submit" value="Sign in" />
            </form>
            </div>
        </div>
    )
}

const SignupWindow = (props) => {
    return (
        <div className="card mt-5">
            <div className="card-header bg-primary text-white">
            Sign up
            </div>
            <div className="card-body">
                <form id="editForm"
                onSubmit={handleSignup}
                name="signupForm"
                action="/signup"
                method="POST">
                    <input id="user" className="form-control" type="text" name="username" placeholder="username" />
                    <br></br>
                    <input id="pass" className="form-control" type="password" name="pass" placeholder="password" />
                    <br></br>
                    <input id="pass2" className="form-control" type="password" name="pass2" placeholder="retype password" />
                    <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                    <input className="btn btn-primary mt-3 float-end" type="submit" value="Create Account" />
                </form>
            </div>
        </div>
    )
}

const ChangePassword = (props) => {
    return ( 
        <div className="card mt-5">
            <div className="card-header bg-primary text-white">
            Change Password
            </div>
            <div className="card-body">
                <form id="editForm"
                onSubmit={handleChange}
                name="changeForm"
                action="/changePassword"
                method="POST">
                    <input id="user" className="form-control" type="text" name="username" placeholder="username" />
                    <br></br>
                    <input id="pass" className="form-control" type="password" name="pass" placeholder="current password" />
                    <br></br>
                    <input id="pass2" className="form-control" type="password" name="pass2" placeholder="new password" />
                    <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                    <input className="btn btn-primary mt-3 float-end" type="submit" value="Change Password" />
                </form>
            </div>
        </div>
    )
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton'); 
    const changePassword = document.getElementById('changePasswordButton')

    loginButton.addEventListener('click',(e)=>{
        e.preventDefault();
        ReactDOM.render(<UserLogin csrf="Placeholer" />,
        document.querySelector("#content"));
        return false;
    });

    signupButton.addEventListener('click',(e)=>{
        e.preventDefault();
        ReactDOM.render(<SignupWindow csrf="Placeholer" />,
        document.querySelector("#content"));
        return false;
    });

    changePassword.addEventListener('click',(e)=>{
        e.preventDefault()
        ReactDOM.render(<ChangePassword csrf="Placeholder" />,
        document.querySelector("#content"));
        return false
    })
}

window.onload = init;