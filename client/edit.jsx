const helper = require('./postHelper.js')

const StoreItemModal = (props) => {
    const modals = props.items.map(item => {
        if(props.acct.Currency - item.currency >= 0) {
            return (
                <form id="itemInfo"
                        name="itemInfo"
                        onSubmit={handleBuy}
                        action="/purchase"
                        method="POST"
                        key={item._id}>
    
                    <div className="modal fade" id={item.Name} tabIndex="-1" aria-labelledby={props.acct.username} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirm</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <img src={'/assets/img/' + item.img} className="img-fluid" alt="Responsive image"/>
                                    <p className="text-left text-danger">${props.acct.Currency} - ${item.currency} = ${props.acct.Currency - item.currency}</p>
                                    <input id="itemID" type="hidden" name="itemID" value={item._id} />
                                    <input id="itemCurrency" type="hidden" name="itemCurrency" value={item.currency} />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Confirm Purchase</button>
                                </div>
                            </div>
                        </div>
                    </div>
              </form>
            )
        }
        return (
            <form id="itemInfo"
                    name="itemInfo"
                    onSubmit={handleBuy}
                    action="/purchase"
                    method="POST"
                    key={item._id}>

                <div className="modal fade" id={item.Name} tabIndex="-1" aria-labelledby={props.acct.username} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirm</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <img src={'/assets/img/' + item.img} className="img-fluid" alt="Responsive image"/>
                                <p className="text-left text-danger">${props.acct.Currency} - ${item.currency} = ${props.acct.Currency - item.currency}</p>
                                <input id="itemID" type="hidden" name="itemID" value={item._id} />
                                <input id="itemCurrency" type="hidden" name="itemCurrency" value={item.currency} />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" disabled>More Currency Required</button>
                            </div>
                        </div>
                    </div>
                </div>
          </form>
        )
    })
        
    return modals;
}

const StoreItem = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="itemsList">
                <h3 className="emptyList">Shop is empty or something went wrong!</h3>
            </div>
        );
    }
    //For csrf not right now
    //let propCopy = props
    const items = props.items.map(item => {
        if(props.acct.SkinOwned.includes(item._id))
        {
            return (
                <div className="col" key={item._id}>
                    <div className="card item" >
                        <div className="card-header bg-dark text-white">
                        {item.Name}
                        </div>
                        <div className="card-body">
                            <img src={'/assets/img/' + item.img} className="img-fluid" alt="Responsive image"/>
                            <p className="text-left">${item.currency}</p>
                            <input id="itemID" type="hidden" name="itemID" value={item._id} />
                            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target={`#${item.Name}`} disabled>
                                Owned
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="col" key={item._id}>
                <div className="card item" >
                    <div className="card-header bg-dark text-white">
                    {item.Name}
                    </div>
                    <div className="card-body">
                        <img src={'/assets/img/' + item.img} className="img-fluid" alt="Responsive image"/>
                        <p className="text-left">${item.currency}</p>
                        <input id="itemID" type="hidden" name="itemID" value={item._id} />
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target={`#${item.Name}`}>
                            Purchase
                        </button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 itemList mt-3">
            {items}
        </div>
    );
}

const handleBuy = (e) => {
    e.preventDefault()
    
    const _id = e.target.querySelector('#itemID').value;
    const currency = e.target.querySelector('#itemCurrency').value;
    console.log(currency)
    if (!_id) {
        console.log("ITEM ID not provided");
        return false;
    }
    helper.sendPost(e.target.action, { _id , currency });

    console.log("WASSUP THO");
    return false 
}

const loadItemsFromModal = async() => {
    const response = await fetch('/getItems')
    const data = await response.json()

    const response1 = await fetch('/getAccountDetails')
    const data2 = await response1.json()
    console.log(data2)

    ReactDOM.render(
        <StoreItemModal items = {data.items} acct = {data2.profile} />,
        document.querySelector("#modalContent")
    )
}

const loadItemsFromServer = async()=>{
    const response = await fetch('/getItems');
    const data = await response.json();
    
    const response1 = await fetch('/getAccountDetails')
    const data2 = await response1.json()


    ReactDOM.render(
        <StoreItem items ={data.items} acct = {data2.profile} />,
        document.querySelector("#content")
    )
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <StoreItem items ={[]} />,
        document.querySelector("#content")
    )
    loadItemsFromModal()
    loadItemsFromServer()
}

window.onload=init;