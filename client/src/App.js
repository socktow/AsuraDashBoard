import { useEffect, useState } from "react";

function App() {
  const [user, setUserData] = useState(null);
  const [guilds, setGuilds] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch user information
    fetch("http://localhost:4000/user/me")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);

        // If the user is logged in, fetch the list of guilds
        if (data) {
          fetch("http://localhost:4000/guilds")
            .then((response) => response.json())
            .then((guildData) => {
              // Check if guildData is an array
              if (Array.isArray(guildData)) {
                setGuilds(guildData);
                console.log("Guilds Data:", guildData); // Log guild data here
              } else {
                console.error("Expected an array for guilds:", guildData);
              }
            })
            .catch((error) => console.error("Error fetching guilds:", error));
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Hello, {user.username}!</h1>
          <h2>Your Guilds:</h2>
          <ul>
            {guilds.map((guild) => (
              <li key={guild.id}>{guild.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <span>Not logged in.</span>
      )}
      <a
        className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white/80 transition-colors duration-300"
        href="http://localhost:4000/auth/discord/login"
      >
        <div className="h-7 w-7 fill-white hover:fill-white/80 mr-4" />
        <span className="text-sm">Sign in with Discord</span>
      </a>
    </div>
  );
}

export default App;
