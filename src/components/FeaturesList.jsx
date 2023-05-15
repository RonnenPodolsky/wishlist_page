import { useEffect, useState } from 'react';

const userID = 'user1';
const FeaturesList = ({ title }) => {
  const [features, setFeatures] = useState([]);

  async function getFeatures() {
    const res = await fetch('/data/features.json');
    const data = await res.json();
    const sortedByVotesWishlistItems = data.wishlistItems.sort(
      (a, b) => b.votes.length - a.votes.length
    );

    setFeatures(sortedByVotesWishlistItems);
  }
  useEffect(() => {
    getFeatures();
  }, []);

  console.log(features);

  return (
    <div className='flex flex-col items-center gap-10'>
      <h1 className='text-4xl	'>{title}</h1>
      <ul className=' border-sky-900 p-4 border-4 flex flex-col gap-10	'>
        {features?.map((feature) => (
          <li key={feature.id} className='border-4 border-slate-200'>
            <h2 className='text-2xl'>{feature.title}</h2>
            <p className='text-xl'>{feature.description}</p>
            <p>הצבעות: {feature.votes.length}</p>
            <button
              disabled={feature.votes.includes(userID)}
              onClick={() => voteForFeature(feature.id)}
              className={
                feature.votes.includes(userID)
                  ? 'border-2 border-green-300'
                  : ''
              }
            >
              👍
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturesList;
