import { Component } from '@angular/core';
import { Poll, PollForm, PollVote } from './types';
import { PollService } from './poll-service/poll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'blockchain-poll';
  showForm = false;
  activePoll: Poll = null;

  polls = this.ps.getPolls();

  constructor(private ps: PollService){ }

  ngOnInit() {
    this.ps.onEvent('PollCreated').subscribe(() => {
      this.polls = this.ps.getPolls();
    });

    this.ps.onEvent('Voted').subscribe((result) => {
      this.polls = this.ps.getPolls();
      this.setActivePoll(this.polls[result['payload'][0]]);
      // console.log(result['payload']);

    });
  }

  setActivePoll(poll){
    this.activePoll = null;

    setTimeout(() => {
      this.activePoll = poll;
    }, 100);
  }

  handlePollCreate(poll: PollForm ) {
    this.ps.createPoll(poll);
  }

  handlePollVote(pollVoted: PollVote) {
    this.ps.vote(pollVoted.id, pollVoted.vote);
  }

}
