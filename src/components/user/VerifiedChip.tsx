import { Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { cn } from "../../utils/cn";

export const VerifiedChip: React.FC<{ isVerified: boolean }> = ({
  isVerified,
}) => (
  <Chip
    icon={
      isVerified ? (
        <CheckCircleOutlineIcon className="!text-white" />
      ) : (
        <HighlightOffIcon className="!text-white" />
      )
    }
    label={isVerified ? "Verified" : "Not Verified"}
    variant="outlined"
    size="small"
    className={cn("!text-white", isVerified ? "!bg-green-500" : "!bg-red-500")}
  />
);
