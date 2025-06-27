import { Link } from "react-router-dom";

function CharacterCard({character}) {
    const characterId=character.url.split('/').filter(Boolean).pop();
    return (
        <div className="card">
            <div className="card-content">
                <h3>{character.name}</h3>
                <div className="card-info">
                    <span>Gender: </span>{character.gender!=='n/a'?character.gender:'No Available'}
                </div>
                <div className="card-info">
                    <span>Height: </span>{character.height!=='unknown'?character.height:'Unknown'}
                </div>
                <div className="card-actions">
                    <Link to={`/character/${characterId}`} className="btn">Detail</Link>
                </div>
            </div>
        </div>
    );
}

export default CharacterCard;