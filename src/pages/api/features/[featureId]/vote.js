import fs from 'fs/promises';
import path from 'path';

const FEATURES_FILE = path.join(process.cwd(), 'src', 'data', 'features.json');

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { action } = req.body;
        const { featureId } = req.query;
        const { userId } = req.body;

        try {
            const featuresData = await fs.readFile(FEATURES_FILE, 'utf-8');
            const features = JSON.parse(featuresData);

            let updatedFeatures;
            if (action === 'remove') {
                updatedFeatures = features.wishlistFeatures.map(feature => {
                    if (feature.id === featureId) {
                        return { ...feature, votes: feature.votes.filter(id => id !== userId), numVotes: feature.numVotes - 1 };

                    }
                    return feature;
                });
            }
            else {
                updatedFeatures = features.wishlistFeatures.map(feature => {
                    if (feature.id === featureId) {
                        return { ...feature, votes: [...feature.votes, userId], numVotes: feature.numVotes + 1 };
                    }
                    return feature;
                });
            }

            const updatedFeaturesData = JSON.stringify({ wishlistFeatures: updatedFeatures }, null, 2);
            await fs.writeFile(FEATURES_FILE, updatedFeaturesData);
            res.status(200).json({ message: 'Feature updated successfully', updatedFeatures });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating feature data' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }

}
