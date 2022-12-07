const helper = require('./postHelper.js')

const Profile = (props) => {
    const items = (
            <div className="card" style={{width: 250, borderRadius: 15}}>
                <div className="card-body p-4" >
                    <div className="d-flex text-black">
                        <img src= {"/assets/img/" + props.profile.currentSkin} alt="Avatar" className="img-fluid" style={{width: 180, borderRadius: 10}} />
                        <div className="flex-grow-1 ms-3" style={{paddingLeft: 50}}>
                            <h5 className="mb-1">{props.profile.username}</h5>
                            <p className="mb-2 pb-1" style={{color: "#2b2a2a"}}>Real Gamer</p>
                            <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{backgroundColor: "#fff"}}>
                                <div>
                                    <p className="small text-muted mb-1" >Games Played:</p>
                                    <p className="mb-0">{props.profile.gamesPlayed}</p>
                                </div>
                                <div className="px-3">
                                    <p className="small text-muted mb-1" >High Score:</p>
                                    <p className="mb-0">{props.profile.HighScore}</p>
                                </div>
                                <div>
                                    <p className="small text-muted mb-1" >Currency: </p>
                                    <p className="mb-0">{props.profile.Currency}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 itemList mt-3">
            {items}
        </div>
    );
}

const loadItemsFromServer = async()=>{
    const response = await fetch('/getOwnedSkins');
    const data = await response.json();

    ReactDOM.render(
        <Skins items ={data.items} />,
        document.querySelector("#selector")
    )
}

const loadAccountFromServer = async()=> {
    const response = await fetch('/getAccountDetails')
    const data = await response.json();
    console.log()
    ReactDOM.render(
        <Profile profile = {data.profile} />,
        document.querySelector("#profile")
    )
}

const Skins = (props) => {
    const items = props.items.map(item => {
        return(
            <div className="carousel-item" key={item._id} data-value={item.img}>
                <img src={'/assets/img/' + item.img} className="d-block mx-auto w-75" alt={item.img}/>
            </div>
        )
    })

    return(
        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false">
            <div className="carousel-inner">
                {items}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

const init = async () => {
    await loadItemsFromServer()
    await loadAccountFromServer()

   // const selectSkin = document.getElementById('selectSkin')

    selectSkin.addEventListener('click',(e)=>{
        let skinImg = document.querySelector('.active').dataset.value
        console.log(skinImg);
        helper.sendPost('/changeSkin', { skinImg });
        return false;
    });


    document.querySelector(".carousel-item").className = "carousel-item active";
}

window.onload = init;

