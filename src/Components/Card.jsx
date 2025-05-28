function Card({img, name}) {
    return (
    <>
        <div className="cardContainer">
            <img src={img} alt="Not found" className="pokemonImg"/>
            <span className="pokemonName">{name.toUpperCase()}</span>
        </div>
    </>
    )
}

export default Card