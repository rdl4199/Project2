const StoreItem = (props) => {
    if (props.shopItems.length === 0) {
        return (
            <div className="itemsList">
                <h3 className="emptyList">Shop is empty or something went wrong!</h3>
            </div>
        );
    }
    let propCopy = props
    const items = props.items.map(item => {
        return (
            <form id="itemInfo"
                name="itemInfo"
                onSubmit={handleBuy}
                action="/purchase"
                method="POST">
                <div class="card">
                    <div class="card-header">
                    {item.name}
                    </div>
                    <div class="card-body">
                    <img src={item.img} class="img-fluid" alt="Responsive image"/>
                    <p class="text-left">${item.currency}</p>
                    <button type="button" class="btn btn-primary">Purchase</button>
                    </div>
                </div>
            </form>
        )
    })
}

const handleBuy = (e) => {
    e.preventDefault()
    
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <StoreItem items ={[]} />,
        document.querySelector("#content")
    )
}

window.onload=init;