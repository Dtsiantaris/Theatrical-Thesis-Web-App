import { useUserContext } from "../../contexts/UserContext";

export const TheatricalUserInfoTab = () => {
  const { user } = useUserContext();

  return (
    <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-primary to-indigo-900">
      Theatrical
    </div>
  );
};
