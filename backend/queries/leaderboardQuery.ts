
export const GetMyPoints = `SELECT points FROM "WeeklyScore" WHERE "userId" = $1`;


export const GetRanking = `SELECT u."username" , w.points from "User" u JOIN "WeeklyScore" w ON u.id =  w."userId" ORDER BY w.points DESC`;
