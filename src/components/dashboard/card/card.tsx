import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

function Card({ title }: string | any) {
  return (
    <div className="bg-gray-700 p-5 rounded-lg flex gap-6 cursor-pointer w-full hover:bg-gray-500">
      <SupervisedUserCircleIcon />
      <div className="flex flex-col gap-5">
        <span className="title">{title}</span>
        <span className="font-medium text-2xl">1.697</span>
        <span className="text-sm">
          <span className="text-secondary">12%</span> περισσότερο από τον
          προηγούμενο μήνα
        </span>
      </div>
    </div>
  );
}

export default Card;
