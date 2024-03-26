import Image from "next/image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

function Rightbar() {
  return (
    <div className="fixed">
      <div className="relative bg-gray-700 p-5 rounded-lg mb-5 mr-9">
        <div className="absolute bottom-0 right-0 w-2/4 h-2/4">
          <Image
            src="/astronaut.png"
            alt=""
            fill
            className="object-contain opacity-20"
          />
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-bold text-secondary">Διαθέσιμο τώρα</span>
          <h3 className="font-medium text-sm">
            Πώς να χρησιμοποιήσετε τη νέα έκδοση του πίνακα ελέγχου διαχειριστή
          </h3>
          <span className="sub">Χρειάζονται 4 λεπτά για να το μαθείς</span>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur addipisciing
            elit.Reprehenderit eius libero persiciatis recusanddae possinmus.
          </p>
          <button className="flex items-center p-3 rounded-lg gap-3 text-white bg-secondary border-none w-max">
            <PlayArrowIcon />
            Watch
          </button>
        </div>
      </div>
      <div className="relative bg-gray-700 p-5 rounded-lg mb-5 mr-9">
        <div className="flex flex-col gap-5">
          <span className="font-bold text-secondary">Έρχεται σύντομα</span>
          <h3 className="font-medium text-sm">
            Lorem ipsum ddolor sit amet consectetur adipiscing
          </h3>
          <span className="sub">Χρειάζονται 4 λεπτά για να το μαθείς</span>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipiscing elit.Reprehenderit
            eius libero persiciatis recusanddae possinmus.
          </p>
          <button className="flex items-center p-3 rounded-lg gap-3 text-white bg-secondary border-none w-max">
            <ReadMoreIcon />
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
