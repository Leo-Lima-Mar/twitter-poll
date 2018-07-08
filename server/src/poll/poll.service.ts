import { Injectable } from '@nestjs/common';
import * as Twit from 'twit';

import { Option } from './models/option.model';
import { Poll } from './models/poll.model';

import { CONFIG } from '../../config';

@Injectable()
export class PollService {

    private stream: Twit.Stream;
    private currentPoll: Poll;
    private lastCurrentHour: number;

    private updatePoll(): void {
        const pollParams: Twit.Params = { track: this.currentPoll.hashtag };
        this.lastCurrentHour = new Date().getHours();
        this.searchTweets(pollParams);
    }

    public updateVotesWithTweet(tweetText: string): void {
        this.updateCurrentHour();
        for (let i: number = 0; i < this.currentPoll.options.length; i++) {
            if (this.hasOptionHashtag(tweetText, i)) {
                this.currentPoll.options[i].totalVotes++;
                this.currentPoll.options[i].votesByHour[0]++;
                break;
            }
        }
    }

    private updateCurrentHour(): void {
        const currentHour: number = new Date().getHours();
        if (this.lastCurrentHour !== currentHour) {
            console.info('New hour!');
            this.currentPoll.options.forEach(
                (option: Option) => option.votesByHour.unshift(0));
            this.lastCurrentHour = currentHour;
        }
    }

    public hasOptionHashtag(tweetText: string, index: number): boolean {
        const option: Option = this.currentPoll.options[index];
        return tweetText.indexOf(option.hashtag) !== -1;
    }

    public searchTweets(pollParams: Twit.Params): void {
        this.stream = new Twit(CONFIG.oauth).stream('statuses/filter', pollParams);
        this.stream.on('tweet', (tweet: any): void => {
            console.info(`${new Date()}[PollService]${tweet.text}`);
            const tweetText: string = tweet.text.toLowerCase();
            this.updateVotesWithTweet(tweetText);
        });
    }

    public getCurrentPoll(): Poll {
        return this.currentPoll;
    }

    public createPoll(newPoll: Poll): Poll {
        if (this.stream) {
            this.stream.stop();
        }
        this.currentPoll = new Poll(newPoll.name, newPoll.hashtag, newPoll.options);
        this.updatePoll();
        return this.currentPoll;
    }

    public endPoll(): void {
        this.stream.stop();
        this.currentPoll = null;
    }

}
