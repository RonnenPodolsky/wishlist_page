import fs from 'fs/promises';
import path from 'path';

const FEATURES_FILE = path.join(process.cwd(), 'src', 'data', 'features.json');
const VOTES_FILE = path.join(process.cwd(), 'src', 'data', 'votes.json');

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { action } = req.body;
        const { featureId } = req.query;
        const { userId } = req.body;

        try {
            const featuresData = await fs.readFile(FEATURES_FILE, 'utf-8');
            const features = JSON.parse(featuresData);
            const votesData = await fs.readFile(VOTES_FILE, 'utf-8');
            const votes = JSON.parse(votesData);
            let updatedFeatures;

            if (action === 'remove') {
                votes[featureId]["votes"] = votes[featureId]["votes"].filter(id => id != userId)

                updatedFeatures = features.wishlistFeatures.map(feature => {
                    if (feature.id === featureId) return { ...feature, numVotes: feature.numVotes - 1 };
                    return feature;
                });
            }
            else {
                if (!votes[featureId]) votes[featureId] = { "votes": [] }
                votes[featureId]["votes"].push(userId)

                updatedFeatures = features.wishlistFeatures.map(feature => {
                    if (feature.id === featureId) return { ...feature, numVotes: feature.numVotes + 1 }
                    return feature;
                });
            }

            const updatedFeaturesData = JSON.stringify({ wishlistFeatures: updatedFeatures }, null, 2);
            const updatedVotesData = JSON.stringify(votes, null, 2);
            await fs.writeFile(FEATURES_FILE, updatedFeaturesData);
            await fs.writeFile(VOTES_FILE, updatedVotesData);

            updatedFeatures = updatedFeatures.map((feature) => {
                const featureVotes = votes[feature.id] ? votes[feature.id].votes : [];
                return { ...feature, votes: featureVotes };
            })
            res.status(200).json({ message: 'Feature updated successfully', updatedFeatures });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating feature data' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
