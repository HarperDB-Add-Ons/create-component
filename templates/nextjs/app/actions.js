'use server';

import('harperdb');

export async function listDogs() {
	const dogs = [];
	for await (const dog of tables.Dog.search()) {
		dogs.push({ id: dog.id, name: dog.name, breed: dog.breed });
	}
	return dogs;
}