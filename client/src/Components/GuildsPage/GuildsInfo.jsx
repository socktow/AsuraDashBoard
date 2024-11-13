import React, { useEffect, useState } from "react";
import guildApi from "../../Api/Api";

const GuildsInfo = ({ guildId }) => {
  const [guildInfo, setGuildInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `Guilds Info : ${guildId}`;

    const fetchGuildInfo = async () => {
      try {
        const response = await guildApi.getGuildById(guildId);
        setGuildInfo(response.data);
      } catch (err) {
        setError("Failed to fetch guild info. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuildInfo();
  }, [guildId]);

  if (loading) return <div className="flex justify-center items-center h-48"><span className="text-white">Loading guild info...</span></div>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!guildInfo) return <p className="text-center text-gray-400">No information found for this guild.</p>;

  const { name, prefix, deletemessageoncommand, dmgreetmessagetext, filterinvites, boostmessage, dateadded, banner, icon } = guildInfo;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
        {/* Guild Banner */}
        {banner && (
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <img
              src={`https://cdn.discordapp.com/banners/${guildId}/${banner}.png`}
              alt="Guild Banner"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center mb-6">
            {/* Guild Icon */}
            {icon && (
              <img
                src={`https://cdn.discordapp.com/icons/${guildId}/${icon}.png`}
                alt="Guild Icon"
                className="w-24 h-24 rounded-full border-4 border-white mr-4 shadow-lg"
              />
            )}
            <h2 className="text-3xl font-bold text-white">{name}</h2>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 text-white space-y-4">
            <p><strong>Prefix:</strong> {prefix}</p>
            <p><strong>Delete message on command:</strong> {deletemessageoncommand ? "Yes" : "No"}</p>
            <p><strong>Greeting message:</strong> {dmgreetmessagetext}</p>
            <p><strong>Boost message:</strong> {boostmessage}</p>
            <p><strong>Filter invites:</strong> {filterinvites ? "Enabled" : "Disabled"}</p>
            <p><strong>Date Added:</strong> {new Date(dateadded).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuildsInfo;
