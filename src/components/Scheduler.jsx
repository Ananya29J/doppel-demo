import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Scheduler() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isRunning && currentTaskIndex !== null) {
      timer = setInterval(() => {
        setTasks((prev) => {
          const updated = [...prev];
          updated[currentTaskIndex].timeSpent += 1;
          return updated;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, currentTaskIndex]);

  // Add Task
  const addTask = () => {
    if (!taskName.trim()) return;
    const newTask = { name: taskName.trim(), timeSpent: 0, done: false };
    setTasks((prev) => [...prev, newTask]);
    setTaskName("");
  };

  // Toggle Done
  const toggleDone = (index) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    );
  };

  // Start/Pause Timer
  const startPauseTimer = (index) => {
    if (currentTaskIndex === index) {
      setIsRunning(!isRunning);
    } else {
      setCurrentTaskIndex(index);
      setIsRunning(true);
    }
  };

  // Stop Timer
  const stopTimer = () => {
    setIsRunning(false);
    setCurrentTaskIndex(null);
  };

  // Format seconds → hh:mm:ss
  const formatTime = (s) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs > 0 ? hrs + "h " : ""}${mins}m ${secs}s`;
  };

  // Graph Data
  const graphData = tasks.map((t) => ({
    name: t.name,
    time: Math.floor(t.timeSpent / 60),
  }));

  // Calculate total time
  const totalSeconds = tasks.reduce((sum, t) => sum + t.timeSpent, 0);
  const totalMins = Math.floor(totalSeconds / 60);
  const productivity =
    tasks.length > 0
      ? Math.floor(
          (tasks.filter((t) => t.done).length / tasks.length) * 100
        )
      : 0;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500 shadow-lg text-white">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">Daily Scheduler</h2>

      {/* Add Task Section */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter Task Name"
          className="flex-1 px-4 py-2 bg-gray-800 text-white border border-purple-500 rounded-lg"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <h3 className="text-2xl font-bold text-purple-300 mb-4">Task Manager</h3>
      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks added yet.</p>
      ) : (
        <ul className="mb-6">
          {tasks.map((t, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-3 mb-2 rounded-lg bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(i)}
                />
                <span
                  className={`${
                    t.done ? "line-through text-green-400" : "text-white"
                  }`}
                >
                  {t.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300">{formatTime(t.timeSpent)}</span>
                <button
                  onClick={() => startPauseTimer(i)}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
                >
                  {currentTaskIndex === i && isRunning ? "Pause" : "Play"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {currentTaskIndex !== null && (
        <button
          onClick={stopTimer}
          className="mb-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
        >
          Stop Current Timer
        </button>
      )}

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-300 mb-2">
          Summary
        </h3>
        <p>Total Study Time: {totalMins} minutes</p>
        <p>Completed Tasks: {tasks.filter((t) => t.done).length}</p>
        <p>Productivity: {productivity}%</p>
      </div>

      {/* Graph */}
      <h3 className="text-2xl font-bold text-purple-300 mb-4">Activity Graph</h3>
      {tasks.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={graphData}>
            <XAxis dataKey="name" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip />
            <Bar dataKey="time" fill="#a855f7" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-300">No activity to display.</p>
      )}
    </div>
  );
}
