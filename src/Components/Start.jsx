function Start({onClick}) {
    return (
        <>
            <div className="startScreen">
                <div className='introduction'>
                    <div>
                        1. There are 24 random Pokémons. Select all 24 Pokémons to win.
                    </div>
                    <div>
                        2. To gain a point, select a Pokémon you have not selected previously.
                    </div>
                    <div>
                        3. If you selected a Pokémon that you've already selected, the points will be reset.
                    </div>
                    <div>
                        4. When you are ready, click the pokéball. Have fun!!!
                    </div>
                </div>
                <button className='startButton' onClick={onClick} />
            </div>
        </>
    )
}

export default Start