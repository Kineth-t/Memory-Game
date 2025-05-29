function Card({img, name, onClick}) {
    return (
    <>
        <div className="cardContainer" onClick={onClick}>
            <img src={img} alt="Not found" className="pokemonImg"/>
            <span className="pokemonName">{name.toUpperCase()}</span>
        </div>
    </>
    )
}

export default Card