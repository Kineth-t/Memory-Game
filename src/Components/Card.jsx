function Card({img, name}) {
    return (
    <>
        <div className="cardContainer">
            <img src={img} alt="Not found" />
            <span>{name.toUpperCase()}</span>
        </div>
    </>
    )
}

export default Card