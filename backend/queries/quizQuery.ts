export const GetQuizByModuleId = `SELECT * FROM "Quiz" WHERE "moduleID" = $1`;
export const GetQusetions = `SELECT  "questions" FROM "Quiz" WHERE "moduleID" = $1 AND "submoduleID" = $2`;
