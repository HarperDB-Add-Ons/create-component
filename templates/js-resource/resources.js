// In this JS Resource, access any of the HDB Globals to get started https://docs.harperdb.io/docs/technical-details/reference/globals

const dogs = [
	{ id: "0", name: "Lincoln", breed: "Shepherd Mix" },
	{ id: "1", name: "Buddy", breed: "Dalmatian" },
	{ id: "2", name: "Bella", breed: "Labrador Retriever" },
	{ id: "3", name: "Charlie", breed: "Great Dane" },
	{ id: "4", name: "Lucy", breed: "Newfoundland" },
]

for (const dog of dogs) {
	tables.Dog.put(dog)
}