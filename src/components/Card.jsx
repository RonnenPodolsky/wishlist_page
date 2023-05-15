const Card = ({ feature, userID }) => {
  return (
    <li className='border-4 border-slate-200'>
      <h2 className='text-2xl'>{feature.title}</h2>
      <p className='text-xl'>{feature.description}</p>
      <p>הצבעות: {feature.votes.length}</p>
      <button
        disabled={feature.votes.includes(userID)}
        onClick={() => voteForFeature(feature.id)}
        className={
          feature.votes.includes(userID) ? 'border-2 border-green-300' : ''
        }
      >
        👍
      </button>
    </li>
  );
};

export default Card;
