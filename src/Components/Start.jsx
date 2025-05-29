function Start({onClick}) {
    return (
        <>
            <div className="startScreen">
                <div className='introduction'>To gain a point, select a card you have not selected.</div>
                <button className='startButton' onClick={onClick}> Press to start!</button>
            </div>
        </>
    )
}

export default Start