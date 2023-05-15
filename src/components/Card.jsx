import { FaThumbsUp } from 'react-icons/fa';

const Card = ({ feature, userId, voteForFeature }) => {
  return (
    <li
      key={feature.id}
      className='flex flex-col content-center gap-2 pb-8 pr-8 border-b-4 last:border-b-0 border-slate-700'
    >
      <h2 className='text-3xl'>{feature.title}</h2>
      <p className='text-xl'>{feature.description}</p>
      <p>הצבעות: {feature.numVotes}</p>
      <button
        onClick={() =>
          !feature.votes?.includes(userId)
            ? voteForFeature(feature.id, 'upvote')
            : voteForFeature(feature.id, 'remove')
        }
        className={`w-12 h-12 flex items-center justify-center
          ${
            feature.votes?.includes(userId)
              ? 'border-4 rounded-full	 border-green-500'
              : ''
          }`}
      >
        <FaThumbsUp />
      </button>
    </li>
  );
};

export default Card;
