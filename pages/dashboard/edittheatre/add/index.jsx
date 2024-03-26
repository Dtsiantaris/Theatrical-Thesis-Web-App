import { Typography } from "@mui/material";

function addTheatrePage() {
  return (
    <>
      <div className="mt-16 max-w-6xl mx-0 my-auto pl-2">
        <Typography
          variant="h2"
          component="h1"
          className="border-l-4 border-secondary pl-2"
        >
          Προσθηκη νεου θεατρου
        </Typography>
      </div>
      <div className="mt-10 p-5 bg-gray-400 rounded-lg">
        <form className="flex flex-wrap justify-between">
          <input
            className="p-5 w-5/12 mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            type="text"
            placeholder="Ονομα"
            name="name"
            required
          />
          <input
            className="p-5 w-5/12 mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            type="text"
            placeholder="Τοποθεσια"
            name="location"
          ></input>
          <input
            className="p-5 w-5/12 mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            type="number"
            placeholder="Χωριτικοτητα"
            name="size"
          />
          <input
            className="p-5 w-5/12 mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            type="number"
            placeholder="Something"
            name="something"
          ></input>
          <textarea
            className="p-5 w-full mb-8 bg-gray-700 border-2 border-gray-500 text-orange-400 placeholder-orange-300 outline-none rounded-lg"
            name="desc"
            id="desc"
            rows="12"
            placeholder="Πληροφοριες"
          ></textarea>
          <button
            className="w-full p-6 bg-teal-800 text-gray-900 border-none rounded-md"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default addTheatrePage;
