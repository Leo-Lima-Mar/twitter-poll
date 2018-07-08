import { Option } from './option.model';

export class Poll {

    constructor(
        public name: string = '',
        public hashtag: string = '',
        public options: Option[] = []) {}

}
