// Import necessary components and modules
import UserList from "@/components/list-user";

// Function to fetch user data from the API
async function getUser() {
  try {
    const data = await fetch("http://api.sarika.hischoolkh.com/get_users", {
      next: { revalidate: 1 }, // Options for revalidation
    });
    const json = await data.json(); // Parse response as JSON
    return json; // Return the JSON data
  } catch (error) {
    throw new Error("Something went wrong"); // Throw an error if fetch fails
  }
}

// Default function for the Home page
export default async function Home() {
  // Fetch user data
  const user = await getUser();

  // Return the main page content
  return (
    // Main page container
    <div className="container p-10">
      {/* Title */}
      <div className="w-full mb-10">
        <h1 className="text-xl font-bold uppercase">
          click on your name to review the text corpus that assigned to you
        </h1>
      </div>
      {/* User List Component */}
      <div className="space-y-2">
        <UserList />
      </div>
    </div>
  );
}
