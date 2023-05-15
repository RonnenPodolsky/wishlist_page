import fs from 'fs/promises';
import path from 'path';

const FEATURES_FILE = path.join(process.cwd(), 'src', 'data', 'features.json');
const VOTES_FILE = path.join(process.cwd(), 'src', 'data', 'votes.json');
const ACTIONS = {
    "remove": -1,
    "upvote": 1
}

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { action, userId } = req.body;
        const { featureId } = req.query;
        if (!ACTIONS[action]) {
            console.log(ACTIONS[action])
            return res.status(400).json({ message: 'Body action is remove or upvote' });
        }
        if (!userId) {
            return res.status(400).json({ message: 'user id is missing' });
        }

        try {
            const featuresData = await fs.readFile(FEATURES_FILE, 'utf-8');
            const votesData = await fs.readFile(VOTES_FILE, 'utf-8');
            const features = JSON.parse(featuresData);
            const votes = JSON.parse(votesData);

            let updatedFeatures = features.wishlistFeatures.map(feature => {
                if (feature.id === featureId) return { ...feature, numVotes: feature.numVotes + ACTIONS[action] };
                return feature;
            });

            if (action === 'remove') votes[featureId].votes = votes[featureId].votes.filter(id => id != userId)
            else if (action === 'upvote') {
                if (!votes[featureId]) votes[featureId] = { "votes": [] }
                votes[featureId].votes.push(userId)
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
            console.log(error);
            res.status(500).json({ message: 'Error updating feature data' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
