"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GitCommand {
  id: number;
  command: string;
  output: string;
  createdAt: string;
  updatedAt: string;
}

export default function DatabasePage() {
  const [dbType, setDbType] = useState<'prisma' | 'sequelize'>('prisma');
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [savedCommands, setSavedCommands] = useState<GitCommand[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCommand, setEditCommand] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCommands();
  }, [dbType]);

  const executeAndCommitCRUD = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/crud-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dbType })
      });
      const result = await response.json();
      setOutput(result.output);
      alert('CRUD implementation committed to GitHub!');
    } catch (error) {
      setOutput('Error generating CRUD implementation');
    } finally {
      setLoading(false);
    }
  };

  const executeCommand = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/git-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, dbType })
      });
      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput('Error executing command');
    } finally {
      setLoading(false);
    }
  };

  const saveCommand = async () => {
    try {
      await fetch('/api/commands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, output, dbType })
      });
      setCommand('');
      setOutput('');
      loadCommands();
    } catch (error) {
      console.error('Error saving command');
    }
  };

  const loadCommands = async () => {
    try {
      const response = await fetch(`/api/commands?dbType=${dbType}`);
      const commands = await response.json();
      setSavedCommands(Array.isArray(commands) ? commands : []);
    } catch (error) {
      console.error('Error loading commands');
      setSavedCommands([]);
    }
  };

  const updateCommand = async (id: number) => {
    try {
      await fetch(`/api/commands/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: editCommand, dbType })
      });
      setEditingId(null);
      setEditCommand('');
      loadCommands();
    } catch (error) {
      console.error('Error updating command');
    }
  };

  const deleteCommand = async (id: number) => {
    if (confirm('Are you sure you want to delete this command?')) {
      try {
        await fetch(`/api/commands/${id}?dbType=${dbType}`, {
          method: 'DELETE'
        });
        loadCommands();
      } catch (error) {
        console.error('Error deleting command');
      }
    }
  };

  const startEdit = (cmd: GitCommand) => {
    setEditingId(cmd.id);
    setEditCommand(cmd.command);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Database Integration - Assignment 2
          </h1>
          <p className="text-gray-600 mb-6">Student: Vinit Kumar (21946017)</p>
          
          {/* Database Type Selection */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Select Database Type:</h3>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="prisma"
                  checked={dbType === 'prisma'}
                  onChange={(e) => setDbType(e.target.value as 'prisma')}
                  className="mr-2"
                />
                <span className="font-medium">Prisma ORM</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="sequelize"
                  checked={dbType === 'sequelize'}
                  onChange={(e) => setDbType(e.target.value as 'sequelize')}
                />
                <span className="font-medium ml-2">Sequelize ORM</span>
              </label>
            </div>
          </div>

          {/* CRUD Generator */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              Generate Full CRUD Implementation
            </h3>
            <p className="text-blue-600 mb-4">
              This will generate and commit a complete CRUD React implementation with Docker setup for {dbType.toUpperCase()}
            </p>
            <button 
              onClick={executeAndCommitCRUD}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : `Generate ${dbType.toUpperCase()} CRUD + Docker`}
            </button>
          </div>

          {/* Command Execution */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Execute Git Command:</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Enter git command (e.g., git status)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={executeCommand}
                disabled={loading || !command.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Execute
              </button>
              <button 
                onClick={saveCommand}
                disabled={!output}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>

          {/* Output Display */}
          {output && (
            <div className="mb-6 p-4 bg-gray-900 text-green-400 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-white">Output:</h3>
              <pre className="whitespace-pre-wrap text-sm overflow-x-auto">{output}</pre>
            </div>
          )}

          {/* Saved Commands CRUD */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Saved Commands ({dbType.toUpperCase()})</h3>
              <button 
                onClick={loadCommands}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Refresh
              </button>
            </div>
            
            <div className="p-4">
              {!Array.isArray(savedCommands) || savedCommands.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No commands saved yet</p>
              ) : (
                <div className="space-y-4">
                  {savedCommands.map((cmd) => (
                    <div key={cmd.id} className="border border-gray-200 rounded-lg p-4">
                      {editingId === cmd.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editCommand}
                            onChange={(e) => setEditCommand(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <div className="flex gap-2">
                            <button 
                              onClick={() => updateCommand(cmd.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button 
                              onClick={() => setEditingId(null)}
                              className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">Command: {cmd.command}</p>
                              <p className="text-sm text-gray-600">Created: {new Date(cmd.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => startEdit(cmd)}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => deleteCommand(cmd.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          {cmd.output && (
                            <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                              <strong>Output:</strong>
                              <pre className="mt-1 whitespace-pre-wrap">{cmd.output}</pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}