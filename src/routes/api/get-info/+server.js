import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI, ID_INFO } from '$env/static/private';
import { json, error } from '@sveltejs/kit';

export async function GET() {
	if (!DB_URI || !ID_INFO) error(410);

	const client = new MongoClient(DB_URI);

	try {
		const database = client.db('nm');
		const info = database.collection('info');

		const query = { _id: new ObjectId(ID_INFO) };
		const projection = { _id: 0, visitors: 1, runs: 1 };

		const document = await info.findOne(query, projection);

		if (document) {
			const { visitors, runs } = document;

			return json({ visitors, runs }, 200);
		} else {
			error(404, 'Info not found');
		}
	} finally {
		client.close();
	}
}
