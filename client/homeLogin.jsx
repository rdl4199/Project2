const UserLogin = (props) => {
    return(
        <div class="card">
            <div class="card-header">
            Sign in
            </div>
            <div class="card-body">
            <form id="editForm"
            name="domoForm"
            action="Login">
                <label htmlFor="username">Username: </label>
                <input id="user" type="text" name="username" placeholder="username" />
                <label htmlFor="pass">Password: </label>
                <input id="pass" type="password" name="pass" placeholder="password" />
                <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                <input className="formSubmit" type="submit" value="Sign in" />
            </form>
            </div>
        </div>
    )
}

const SignupWindow = (props) => {
    return (
        <div class="card">
            <div class="card-header">
            Sign in
            </div>
            <div class="card-body">
                <form id="editForm"
                name="domoForm"
                action="Login">
                    <label htmlFor="username">Username: </label>
                    <input id="user" type="text" name="username" placeholder="username" />
                    <label htmlFor="pass">Password: </label>
                    <input id="pass" type="password" name="pass" placeholder="password" />
                    <label htmlFor="pass2">Password: </label>
                    <input id="pass2" type="password" name="pass2" placeholder="retype password" />
                    <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                    <input className="formSubmit" type="submit" value="Sign in" />
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
}

window.onload = init;