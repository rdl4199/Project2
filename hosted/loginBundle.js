(()=>{const e=e=>React.createElement("div",{class:"card"},React.createElement("div",{class:"card-header"},"Sign in"),React.createElement("div",{class:"card-body"},React.createElement("form",{id:"editForm",name:"domoForm",action:"Login"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign in"})))),t=e=>React.createElement("div",{class:"card"},React.createElement("div",{class:"card-header"},"Sign in"),React.createElement("div",{class:"card-body"},React.createElement("form",{id:"editForm",name:"domoForm",action:"Login"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"password"}),React.createElement("label",{htmlFor:"pass2"},"Password: "),React.createElement("input",{id:"pass2",type:"password",name:"pass2",placeholder:"retype password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign in"}))));window.onload=async()=>{const a=await fetch("/getToken"),c=(await a.json(),document.getElementById("loginButton")),n=document.getElementById("signupButton");c.addEventListener("click",(t=>(t.preventDefault(),ReactDOM.render(React.createElement(e,{csrf:"Placeholer"}),document.querySelector("#content")),!1))),n.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(t,{csrf:"Placeholer"}),document.querySelector("#content")),!1)))}})();