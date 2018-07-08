export class Option {

    constructor(
        public name: string,
        public hashtag: string,
        public totalVotes: number,
        public votesByHour: number[]) { }

}
