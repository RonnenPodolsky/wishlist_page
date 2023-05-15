import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from './Card';
const userID = '1a276066-14f8-4bd2-8e81-7349f79f8d17';

const FeaturesList = ({ title }) => {
  const [features, setFeatures] = useState([]);

  async function getFeatures() {
    const res = await fetch('/api/features');
    const data = await res.json();
    const sortedByVotesWishlistItems = data.wishlistItems.sort(
      (a, b) => b.votes.length - a.votes.length
    );

    setFeatures(sortedByVotesWishlistItems);
  }
  useEffect(() => {
    getFeatures();
  }, []);

  return (
    <div className='flex flex-col items-center gap-10 '>
      <h1 className='text-4xl	'>{title}</h1>
      <ul className=' border-sky-900 p-4 border-4 flex flex-col gap-6 min-w-[400px] max-w-[800px]	'>
        {features?.map((feature) => (
          <Card key={feature.id} feature={feature} userID={userID} />
        ))}
      </ul>
    </div>
  );
};

export default FeaturesList;
