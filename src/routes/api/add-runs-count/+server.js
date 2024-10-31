import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI, ID_INFO } from '$env/static/private';
import { json, error } from '@sveltejs/kit';

export async function POST() {
	if (!DB_URI || !ID_INFO) error(410);

	const client = new MongoClient(DB_URI);

	try {
		const database = client.db('nm');
		const info = database.collection('info');

		const query = { _id: new ObjectId(ID_INFO) };
		const increaseRun = { $inc: { runs: 1 } };

		info.updateOne(query, increaseRun);
	} finally {
		await client.close();
	}

	return json(null, 201);
}
