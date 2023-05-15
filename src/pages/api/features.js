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
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    try {
      const featuresData = await fs.readFile(FEATURES_FILE, 'utf-8');
      const features = JSON.parse(featuresData);
      const newFeature = {
        id: Date.now(),
        title,
        description,
        liked: false,
        votes: 0
      };
      features.push(newFeature);
      const updatedFeaturesData = JSON.stringify(features, null, 2);
      await fs.writeFile(FEATURES_FILE, updatedFeaturesData);
      res.status(201).json(newFeature);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error writing feature data' });
    }
  }
  
  else if (req.method === 'PUT') {
    const featureId = Number(req.query.id);
    try {
      const featuresData = await fs.readFile(FEATURES_FILE, 'utf-8');
      const features = JSON.parse(featuresData);
      const updatedFeatures = features.map(feature => {
        if (feature.id === featureId) {
          return { ...feature, liked: true, votes: feature.votes + 1 };
        }
        return feature;
      });
      const updatedFeaturesData = JSON.stringify(updatedFeatures, null, 2);
      await fs.writeFile(FEATURES_FILE, updatedFeaturesData);
      res.status(200).json({ message: 'Feature updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating feature data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
