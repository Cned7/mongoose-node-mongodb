import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connecting to MongoDB Database

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
  console.log("Connected to MongoDB Successfully")
);
mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection error:", err)
);

// Creating a Person Prototype

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  club: { type: String },
  favoriteFoods: [String],
  id: { type: String, unique: true },
});

// Create a Person Model based on the Schema
const Person = mongoose.model("Person", personSchema);

// Create and Save a Record of the Model
const createAndSavePerson = () => {
  const newPerson = new Person({
    name: "Chinedu Nwogu",
    age: 70,
    club: "Manchester United",
    favoriteFoods: ["Rice", "Dodo"],
    id: "010",
  });

  return newPerson
    .save()
    .then((data) => console.log("Saved Person:", data))
    .catch((err) => console.error("Error Saving Person:", err));
};

// Create Many Records with Person.create

const createManyPeople = (arrayOfPeople) => {
  return Person.create(arrayOfPeople)
    .then((data) => console.log("Created Many People:", data))
    .catch((err) => console.error("Error Creating Many People:", err));
};

// Finding People by Name
const findPeopleByName = (name) => {
  return Person.find({ name })
    .then((data) => console.log("Found People:", data))
    .catch((err) => console.error("Error Finding People:", err));
};

// Find One Person by Favorite Food
const findOneByFood = (food) => {
  return Person.findOne({ favoriteFoods: food })
    .then((data) => console.log("Found One Person:", data))
    .catch((err) => console.error("Error Finding One Person:", err));
};

// Find One Person by ID
const findPersonById = (personId) => {
  return Person.findOne({ id: personId })
    .then((data) => console.log("Found Person by ID:", data))
    .catch((err) => console.error("Error Finding Person by ID:", err));
};

// Update a Person by Adding a new favourite Food

const addFoodToFavorite = (personId, food) => {
  return Person.findOne({ id: personId })
    .then((person) => {
      if (!person) throw new Error("Person not found");
      person.favoriteFoods.push(food);
      return person.save();
    })
    .then((updatedPerson) => console.log("Updated Person:", updatedPerson))
    .catch((err) => console.error("Error Updating Person:", err));
};

// Update a Person’s Age by Name
const updatePersonAge = (personName, age) => {
  return Person.findOneAndUpdate({ name: personName }, { age }, { new: true })
    .then((updatedPerson) => console.log("Updated Person:", updatedPerson))
    .catch((err) => console.error("Error Updating Age:", err));
};

// Delete One Person by ID
const deletePersonById = (personId) => {
  return Person.findByIdAndRemove(personId)
    .then((deletedPerson) => console.log("Deleted Person:", deletedPerson))
    .catch((err) => console.error("Error Deleting Person:", err));
};

// Delete Many People by Name
const deletePeopleByName = (name) => {
  return Person.deleteMany({ name })
    .then((result) => console.log("Deleted Many People:", result))
    .catch((err) => console.error("Error Deleting Many People:", err));
};

// Chain Search Query Helpers

const findPeopleWhoLikeBurritos = () => {
  return Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec()
    .then((data) => console.log("People Who Like Burritos:", data))
    .catch((err) =>
      console.error("Error Finding People Who Like Burritos:", err)
    );
};

(async () => {
  // await createAndSavePerson();
  // await createManyPeople([
  // { name: "Mary", age: 30, id: "109", favoriteFoods: ["Pasta"] },
  // { name: "Jane", age: 20, id: "110", favoriteFoods: ["Sushi", "Burritos"] },
  // { name: "Chioma", age: 35, id: "111", favoriteFoods: ["Rice", "Beans", "Dodo"]},
  // ]);
  // await findPeopleByName("Mary");
  // await findOneByFood("Sushi");
  // await findPersonById("110");
  await addFoodToFavorite("010", "Hamburger");
  // await updatePersonAge("Mary", 35);
  // await deletePersonById("111");
  // await deletePeopleByName("Mary");
  // await findPeopleWhoLikeBurritos();
})();
