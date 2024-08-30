import { listDogs } from "./actions";

export default async function Page() {
	const dogs = await listDogs();
	return (
		<section>
			<p>There are <strong>{dogs.length}</strong> dogs.</p>
		</section>
	)
}