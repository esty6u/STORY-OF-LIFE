
export class User {
    constructor(
        public loggedIn: boolean,
        public type: string,
        public professions?: string[],
        public myStudents?: string[],

        public myParents?: string[],

        public myChildren?: string[],
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public password?: string,
        public uid?: string,
        public appartment?: string,
        public docId?: string,
        public showInDisplay?: boolean,
        public showSurvey?: boolean,
        public studSentence?: string,
        public questions?: string[],
        public myStrengths?: string[],
        public mySurvey?: string[],
        public SurveyCompleted?: boolean,
        public scheduleLink?: string
    ) { }
}
