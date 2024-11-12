import React from 'react';

const GuildsBanner = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Asura Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Banner Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <img
              src="https://cdn.discordapp.com/banners/964590728397344868/a_065e5bf19177ce5066c83acf1fc0f771.gif?size=4096"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <div className="flex items-center">
                <img
                  src="https://cdn.discordapp.com/avatars/964590728397344868/2f241a84bef89c8deaf5ceb2af8a3067.png?size=2048"
                  className="w-24 h-24 rounded-full border-4 border-white mr-4"
                />
                <div>
                  <h2 className="text-3xl font-bold">Asura</h2>
                  <p className="text-lg">Version: 8</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bot Status Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Bot Status</h2>
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full mr-2 bg-green-500" aria-hidden="true"></div>
            <span className="capitalize">Online</span>
          </div>
          <p>Latency: 104ms</p>
        </div>

        {/* Bot Stats Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Bot Stats</h2>
          <p>Commands: 736</p>
          <p>Modules: 27</p>
          <p>Users: 22921</p>
        </div>

        {/* Technical Info Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Technical Info</h2>
          <p>Discord.NET: Discord.Net 3.16.0</p>
          <p>Commit Hash: 187c56669e70894fa964d5dc0c6c826aaa73d1e9</p>
        </div>
      </div>
    </div>
  );
};

export default GuildsBanner;
