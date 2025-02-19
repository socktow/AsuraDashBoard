import React, { useState } from 'react';
import data from './commandlist.json';

const Commands = () => {
  const [selectedModule, setSelectedModule] = useState('Administration');
  const [searchTerm, setSearchTerm] = useState('');
  const moduleData = data[selectedModule] || [];

  const filteredCommands = moduleData.filter(
    (command) =>
      command.Aliases.some((alias) => alias.toLowerCase().includes(searchTerm.toLowerCase())) ||
      command.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      command.Usage.some((usage) => usage.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <aside className="w-1/6 bg-gray-800 p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-green-400">Modules</h2>
        <ul className="space-y-2">
          {Object.keys(data).map((module) => (
            <li
              key={module}
              className={`p-2 cursor-pointer rounded ${
                selectedModule === module ? 'bg-green-600 text-white' : 'hover:bg-gray-700'
              }`}
              onClick={() => setSelectedModule(module)}
            >
              {module}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4 text-green-400">
          {selectedModule} Commands
        </h2>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search commands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 text-gray-200 rounded-lg"
        />

        <table className="w-full bg-gray-800 text-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-green-400">
            <tr>
              <th className="p-5 text-left w-1/6">Command</th>
              <th className="p-3 text-left">Alias</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Usage</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, index) => {
                const cleanedAliases = command.Aliases.map((alias) =>
                  alias.replace(/^\./, '')
                );
                const mainCommand = cleanedAliases[0];
                const otherAliases = cleanedAliases.slice(1).join('\n');

                return (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="p-3 text-green-300">
                      {mainCommand}
                      <div className="text-xs text-yellow-400 mt-1">
                        {command.Requirements.join(', ')}
                      </div>
                    </td>
                    <td className="p-3 whitespace-pre-line text-green-200">
                      {otherAliases}
                    </td>
                    <td className="p-3">{command.Description}</td>
                    <td className="p-3 text-blue-400">
                      {command.Usage.join(', ').replace(/^\./, '')}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-400">
                  No commands found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Commands;
