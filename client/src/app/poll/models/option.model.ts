export class Option {

    constructor(
        public name: string = '',
        public hashtag: string = '',
        public totalVotes: number = 0,
        public votesByHour: number[] = []) { }

}
