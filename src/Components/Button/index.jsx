import "./index.css"

export function Button({ text, onClick }) {
    return (
        
            <button className="btn-custom" onClick={onClick}>
                {text}
            </button>
        
    )

}