import { listDogs } from "./actions";

export default async function Page() {
	const dogs = await listDogs();
	return (
		<section>
			<p>There are <strong>{dogs.length}</strong> dogs.</p>
			<p>The first dog, <strong>{dogs[0].name}</strong>, is a <strong>{dogs[0].breed}</strong></p>
		</section>
	)
}