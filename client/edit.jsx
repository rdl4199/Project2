const StoreItem = (props) => {
    return ( 
        <div class="card">
            <div class="card-header">
            {props.name}
            </div>
            <div class="card-body">
            <img src={props.img} class="img-fluid" alt="Responsive image"/>
            <p class="text-left">${props.currency}</p>
            <button type="button" class="btn btn-primary">Purchase</button>
            </div>
        </div>
    )
}

const handleBuy = (e) => {
    e.preventDefault()
    
}