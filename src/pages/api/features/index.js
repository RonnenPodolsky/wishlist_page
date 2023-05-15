import fs from 'fs/promises';
import path from 'path';

const FEATURES_FILE = path.join(process.cwd(), 'src', 'data', 'features.json');
const VOTES_FILE = path.join(process.cwd(), 'src', 'data', 'votes.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const featuresData = await fs.readFile(FEATURES_FILE, 'utf-8');
      const features = JSON.parse(featuresData);
      const votesData = await fs.readFile(VOTES_FILE, 'utf-8');
      const votes = JSON.parse(votesData);

      const featuresWithVotes = features.wishlistFeatures.map(feature => {
        const featureVotes = votes[feature.id] ? votes[feature.id].votes : [];
        return { ...feature, votes: featureVotes };
      });

      res.status(200).json(featuresWithVotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Error reading features data' });
    }
  }

  else if (req.method === 'POST') {
    const { userId, featureId, title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
      const featuresData = await fs.readFile(FEATURES_FILE, 'utf-8');
      const features = JSON.parse(featuresData);
      const votesData = await fs.readFile(VOTES_FILE, 'utf-8');
      let votes = JSON.parse(votesData);

      let newFeature = {
        id: featureId,
        title,
        description,
        "numVotes": 1
      };
      features.wishlistFeatures.push(newFeature);
      const updatedFeaturesData = JSON.stringify(features, null, 2);
      await fs.writeFile(FEATURES_FILE, updatedFeaturesData);

      votes = { ...votes, [featureId]: { "votes": [userId] } }
      const updatedVotesData = JSON.stringify(votes, null, 2);
      await fs.writeFile(VOTES_FILE, updatedVotesData);

      newFeature = { ...newFeature, votes: votes[newFeature.id] ? votes[newFeature.id].votes : [] }
      res.status(201).json({ message: 'Feature created successfully', newFeature });
    }

    catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error writing feature data' });
    }
  }

  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
