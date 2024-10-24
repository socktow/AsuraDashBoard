import axios from "./axios";

const guildApi = {
  getUserGuilds: () => {
    return axios.get("/guilds");
  },
};

export default guildApi;
