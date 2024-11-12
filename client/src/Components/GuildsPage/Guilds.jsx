import React, { useEffect } from "react";
import GuildsNavbar from "./GuildsNavbar";

const Guilds = () => {
  useEffect(() => {
    document.title = "Guilds Page"; 
  }, []);

  return (
    <div>
      <GuildsNavbar />
    </div>
  );
}

export default Guilds;
