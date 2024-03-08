import { useState } from "react";
// mui
import { Button } from "@mui/material"
// icons
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// hooks
import { useUserContext } from "../../contexts/UserContext"
import { useUserQueries } from "../../hooks/queries/useUserQueries"
import { useUserMutations } from "../../hooks/mutations/useUserMutations"
// components
import UploadUserPhotoDialog from "../UploadUserPhotoDialog";
import SelectProfilePhotoDialog from "../SelectProfilePhotoDialog";

const UserProfilePhoto = () => {
const { user } = useUserContext()
const { loading } = useUserQueries()
const { loading: loadingMutation } = useUserMutations()

// dialogs state
const [isSelectProfilePhotoOpen, setIsSelectProfilePhotoOpen] =
useState(false);
const [isUploadProfileDialogOpen, setIsUploadProfileDialogOpen] =
useState(false);

if(!user) return <div>Loading User</div>;

return (
    <>
        <div className="flex p-3 rounded-md flex-col md:flex-row md:gap-10">
          {user.profilePhoto && user.profilePhoto.imageLocation ? (
            <div className="flex flex-col gap-2 items-center justify-center h-full">
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.profilePhoto.imageLocation}
                  alt="Profile"
                  className="w-[15rem] h-[15rem] rounded-full shadow-lg" // adjust styling as needed
                />
              }
              <Button
                variant="contained"
                className="text-white hover:!opacity-80 !bg-secondary"
                onClick={() => setIsSelectProfilePhotoOpen(true)}
                disabled={loadingMutation || loading}
                startIcon={<AddAPhotoIcon />}
              >
                Αλλαγή Φωτογραφίας
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-center w-20 h-20 rounded-full mr-4 bg-gray-200">
                {/* Placeholder content, e.g., an upload icon or text */}
                <CameraAltIcon className="mr-1" />
              </div>
              <Button
                variant="contained"
                disabled={loadingMutation || loading}
                className="text-white hover:!opacity-80 !bg-secondary"
                onClick={() => setIsUploadProfileDialogOpen(true)}
                startIcon={<AddAPhotoIcon />}
              >
                Upload Profile Photo
              </Button>
            </div>
          )}
          </div>
           {/* Dialogs */}
      <SelectProfilePhotoDialog
      isOpen={isSelectProfilePhotoOpen}
      onClose={() => setIsSelectProfilePhotoOpen(false)}
      existingPhotos={user.userImages}
    />
    <UploadUserPhotoDialog
      isOpen={isUploadProfileDialogOpen}
      onClose={() => setIsUploadProfileDialogOpen(false)}
    />
    </>
    )
}

export default UserProfilePhoto;