const AddFeatureForm = ({
  addNewFeature,
  setNewFeatureDescription,
  setNewFeatureTitle,
  newFeatureTitle,
  newFeatureDescription,
  error,
  ref,
}) => {
  return (
    <form className='flex flex-col w-1/2 gap-2 mb-8' onSubmit={addNewFeature}>
      <label htmlFor='newFeatureTitle' className='text-xl'>
        כותרת:
      </label>
      <input
        className='p-2'
        type='text'
        id='newFeatureTitle'
        value={newFeatureTitle}
        onChange={(e) => setNewFeatureTitle(e.target.value)}
      />
      <label htmlFor='newFeatureDescription' className='text-xl'>
        תיאור:
      </label>
      <textarea
        className='p-2'
        rows={6}
        id='newFeatureDescription'
        value={newFeatureDescription}
        onChange={(e) => setNewFeatureDescription(e.target.value)}
      ></textarea>
      <div className='flex'>
        <p className='text-red-500'>{error}</p>
        <button
          className='w-1/4 px-4 py-2 mr-auto font-bold text-white rounded bg-slate-700 hover:bg-slate-500'
          type='submit'
        >
          הוסף
        </button>
      </div>
    </form>
  );
};

export default AddFeatureForm;
