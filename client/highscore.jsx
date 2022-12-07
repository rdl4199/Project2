const HighScores = (props) => {
    const profiles = props.profile.map(score => {
        return(
            <div key={score._id}>
                <div className="row">
                    <div className="col-2">{score.username}</div>
                    <div className="col-8"></div>
                    <div className="col-2" style={{float: "right"}}>Highscore: {score.HighScore}</div>
                </div>
                <hr></hr>
            </div>
        )
    })

    return(
        <div className="mt-5">
            {profiles}
        </div>
    )
}

const loadHighScoresFromServer = async()=>{
    const response = await fetch('/getHighScores');
    const data = await response.json();
    console.log(data)
    ReactDOM.render(
        <HighScores profile = {data.profile} />,
        document.querySelector("#content")
    )
}

const init = async () => {
    loadHighScoresFromServer()
}

window.onload = init