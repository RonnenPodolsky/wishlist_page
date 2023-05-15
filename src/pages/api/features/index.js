import fs from 'fs/promises';
import path from 'path';

const FEATURES_FILE = path.join(process.cwd(), 'src', 'data', 'features.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const featuresData = await fs.readFile(FEATURES_FILE, 'utf-8');
      const features = JSON.parse(featuresData);
      res.status(200).json(features);
    } catch (error) {
      console.log(error);
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
      const newFeature = {
        id: featureId,
        title,
        description,
        votes: [userId],
        "numVotes": 1
      };
      features.wishlistFeatures.push(newFeature);
      const updatedFeaturesData = JSON.stringify(features, null, 2);
      await fs.writeFile(FEATURES_FILE, updatedFeaturesData);
      
      res.status(201).json({ message: 'Feature created successfully', newFeature });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error writing feature data' });
    }
  }

  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
