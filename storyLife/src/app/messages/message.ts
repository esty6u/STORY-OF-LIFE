export class Message  {
    constructor(
        public date?: string,
        public type?: string,
        public subject?: string,
        public content?: string,
        public from?: string,
        public to?: string,
        public uid?: number,
     
     
    ) { }
}
