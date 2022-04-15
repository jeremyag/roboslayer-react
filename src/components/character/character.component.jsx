import "./character.styles.css";
const Character = ({ imgId, role, health, className }) => {
  health = health <= 0 ? 0 : health;
  return (
    <div className="character">
      <img
        alt="Character avatar"
        src={`https://robohash.org/${imgId}?size=180x180`}
      />
      <h2 className="player-role">{role}</h2>
      <div>
        <div className="progress health">
          <div
            className={`progress-bar ${className}`}
            style={{ width: `${health}%` }}
          >
            {health}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
