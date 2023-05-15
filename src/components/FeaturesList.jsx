import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddFeatureForm from './AddFeatureForm';
import Card from './Card';

let userId;

const FeaturesList = ({ title, featuress }) => {
  const [features, setFeatures] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [newFeatureTitle, setNewFeatureTitle] = useState('');
  const [newFeatureDescription, setNewFeatureDescription] = useState('');

  // wasnt in product spec, can easily be removed or changed to date sorting etc.
  const sortFeatures = (features) =>
    features.sort((a, b) => b.numVotes - a.numVotes);

  const voteForFeature = async (featureId, action) => {
    const res = await fetch(`/api/features/${featureId}/vote`, {
      method: 'PUT',
      body: JSON.stringify({ userId, action }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setFeatures(sortFeatures(data.updatedFeatures));
  };

  const addNewFeature = async (e) => {
    e.preventDefault();
    if (!newFeatureTitle && !newFeatureDescription) {
      setError('אנא הוסף כותרת ותיאור!');
      return;
    }

    if (!newFeatureTitle) {
      setError('אנא הוסף כותרת!');
      return;
    }

    if (!newFeatureDescription) {
      setError('אנא הוסף תיאור!');
      return;
    }

    const res = await fetch('/api/features', {
      method: 'POST',
      body: JSON.stringify({
        title: newFeatureTitle,
        description: newFeatureDescription,
        userId,
        featureId: uuidv4(),
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setFeatures((prevFeatures) =>
      sortFeatures([...prevFeatures, data.newFeature])
    );

    setNewFeatureTitle('');
    setNewFeatureDescription('');
    setShowForm(false);
  };

  useEffect(() => {
    async function getFeatures() {
      const res = await fetch('/api/features');
      const data = await res.json();
      setFeatures(sortFeatures(data));
    }
    getFeatures();
  }, []);

  useEffect(() => {
    userId = localStorage.getItem('id') || uuidv4();
    localStorage.setItem('id', userId);
  }, []);

  console.log(features);

  return (
    <div className='flex flex-col items-center gap-10 '>
      <h1 className='mt-10 text-4xl '>{title}</h1>
      <button
        className={`w-1/2 px-4 py-2 text-2xl font-bold text-white rounded bg-slate-700 hover:bg-slate-500`}
        onClick={() => {
          setShowForm((prev) => !prev);
        }}
      >
        {'הוספת בקשה'}
      </button>
      {showForm && (
        <AddFeatureForm
          addNewFeature={addNewFeature}
          setNewFeatureDescription={setNewFeatureDescription}
          setNewFeatureTitle={setNewFeatureTitle}
          newFeatureDescription={newFeatureDescription}
          newFeatureTitle={newFeatureTitle}
          error={error}
        />
      )}
      <ul className=' border-slate-700 p-8 mb-8 border-4 flex flex-col gap-6 min-w-[350px] max-w-[800px] 	'>
        {features?.map((feature) => (
          <Card
            key={feature.id}
            feature={feature}
            userId={userId}
            voteForFeature={voteForFeature}
          />
        ))}
      </ul>
    </div>
  );
};

export default FeaturesList;
