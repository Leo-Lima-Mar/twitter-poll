import { Option } from './option.model';

export class Poll {

    constructor(
        public name: string,
        public hashtag: string,
        public options: Option[]) {
            this.normalizeHashtag();
            this.normalizeOptions();
        }

    private normalizeHashtag(): void {
        this.hashtag = this.hashtag.toLowerCase();
        this.hashtag = this.hashtag.replace(/\s/g, '');
        this.hashtag = this.hashtag.replace(/#/g, '');
        this.hashtag = `#${this.hashtag}`;
    }

    private normalizeOptions(): void {
        for (const option of this.options) {
            option.hashtag = option.hashtag.toLowerCase();
            option.hashtag = option.hashtag.replace(/\s/g, '');
            option.hashtag = option.hashtag.replace(/#/g, '');
            option.hashtag = `#${option.hashtag}`;
            option.totalVotes = 0;
            option.votesByHour = [ 0 ];
        }
    }

}
