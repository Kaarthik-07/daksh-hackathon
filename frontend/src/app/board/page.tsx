"use client"
import React from 'react';

interface LeaderboardItem {
  id: string;
  name: string;
  score: number;
}

interface LeaderboardProps {
  leaderboardData: LeaderboardItem[];
}

const board: React.FC<LeaderboardProps> = ({ leaderboardData }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {leaderboardData.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-2">
            <span className="font-semibold">{item.name}</span>
            <span className="text-gray-600">{item.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default board;
