import { FaThumbsUp } from 'react-icons/fa';

const Card = ({ feature, userID }) => {
  return (
    <li className='flex flex-col gap-2 content-center last:border-b-0 border-b-4 border-slate-700 pb-8 pr-8'>
      <h2 className='text-2xl'>{feature.title}</h2>
      <p className='text-xl'>{feature.description}</p>
      <p>הצבעות: {feature.votes.length}</p>
      <button
        disabled={feature.votes.includes(userID)}
        onClick={() => voteForFeature(feature.id)}
        className={`w-12 h-12 flex items-center justify-center
          ${
            feature.votes.includes(userID)
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
