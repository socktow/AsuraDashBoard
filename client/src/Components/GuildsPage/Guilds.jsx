import React from "react";

function Guilds({ guilds }) {
  return (
    <div>
      <h2>Your Guilds:</h2>
      <ul>
        {guilds.map((guild) => (
          <li key={guild.id}>{guild.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Guilds;
