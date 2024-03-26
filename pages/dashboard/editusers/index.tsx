import Head from "next/head";
import Search from "../../../src/components/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import TablePagination from "../../../src/components/TablePagination";
import { mainFetcher } from "../../../src/utils/AxiosInstances";
import { useEffect, useState } from "react";
import { ArtistCardProps } from "../../../src/types/cards/ArtistCardProps";

function editUserPage() {
  const [userData, setUserData] = useState<ArtistCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mainFetcher("/People?page=0");
        console.log(response.results);
        setUserData(response.results);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Edit User | Theatrica</title>
      </Head>
      <div className="mt-14 p-5 bg-gray-400 rounded-lg">
        <div className="flex items-center justify-between">
          <Search placeholder="Βρες εναν λογαριασμο..." />
          <Link href="/dashboard/editusers/add">
            <button className="p-3 bg-secondary border-none rounded-md">
              Προσθηκη νεου
            </button>
          </Link>
        </div>
        <table className="mt-10 w-full border-separate border-spacing-y-5">
          <thead>
            <tr>
              <td>Ονομα</td>
              <td>Ρόλοι</td>
              <td>Ετος γέννησης</td>
              <td>Υψος</td>
              <td>Acion</td>
            </tr>
          </thead>
          <tbody>
            {userData !== null ? (
              userData.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {user.images && user.images.length > 0 ? ( // Check if images array is defined and not empty
                        <Image
                          className="rounded-full object-cover"
                          src={user.images[0].imageUrl} // Get the URL of the first image
                          alt=""
                          width={40}
                          height={40}
                        />
                      ) : (
                        <Image
                          className="rounded-full object-cover"
                          src="/noavatar.png" // Render default "noavatar" image if images array is empty or null
                          alt=""
                          width={40}
                          height={40}
                        />
                      )}
                      {user.fullname}
                    </div>
                  </td>
                  <td>
                    {
                      user.roles // Check if roles is not null or empty
                        ? user.roles.length > 0 // Check if roles array has elements
                          ? user.roles.join(", ") // Display roles nicely
                          : "Μη διαθεσιμο" // Display if roles array is empty
                        : "Μη διαθεσιμο" // Display if roles is null
                    }
                  </td>
                  <td>{user.birthdate ? user.birthdate : "Μη διαθεσιμο"}</td>
                  <td>{user.height ? user.height : "-"}</td>
                  <td>
                    <div className="flex gap-3">
                      <Link href={`/dashboard/editusers/${user.id}`}>
                        <button className="px-2 py-2 rounded-md border-none text-white bg-teal-800">
                          View
                        </button>
                      </Link>
                      <button className="px-2 py-2 rounded-md border-none text-white bg-red-400">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Loading ....</td>
              </tr>
            )}
          </tbody>
        </table>
        <TablePagination />
      </div>
    </>
  );
}

export default editUserPage;
