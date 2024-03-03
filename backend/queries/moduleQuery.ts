export const GetModulesById = `SELECT * FROM 'Module' WHERE id = $1`;
export const GetLeaderboard =  `SELECT * FROM 'LeaderBoard'`;
export const GetSubmodules = `SELECT * FROM 'Submodule' WHERE id = $1`;