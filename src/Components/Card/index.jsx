import "./index.scss"

export function Card({ children }) {
    return (
        <div className="card">
            {children}
        </div>
    )
}

export function CardImage({ src }) {
    return (
        <img className="card-image" src={src} />
    )
}

export function CardTitle({title}){
    return(
        <h2 className="card-title">{title}</h2>
    )
}

export function CardDate({date}){
    return(
        <p className="card-date">{date}</p>
    )
}

export function CardReview({vote_average}){
    return(
        <p className="card-description">{vote_average}</p>
    )
}