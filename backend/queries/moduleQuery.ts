export const GetModulesById = `SELECT * FROM "Module" WHERE id = $1`;
export const GetLeaderboard =  `SELECT * FROM "LeaderBoard"`;
export const GetSubmodules = `SELECT * FROM "Submodule" WHERE "moduleID" = $1 `;
export const GetModules = `SELECT * FROM "Module"`;
export const GetVideo = `SELECT "animations" FROM "Submodule" WHERE "moduleID" = $1 AND id = $2 `;