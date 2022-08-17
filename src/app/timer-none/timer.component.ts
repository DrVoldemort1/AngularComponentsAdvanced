import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer-none',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers:[TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None
})
export class TimerNoneComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;
  private countDownEndSubscription : Subscription = null;
  private countDownSubscription : Subscription = null
  public countDown: number = 0

  get progress(){
    console.log("getting progress")
    return (this.init-(this.countDown ))/this.init*100
  }


  constructor(
    public timer:TimerService,
    private cdRef:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.timer.restartCountdown(this.init)
    this.countDownEndSubscription= this.timer.countDownEnd$.subscribe(()=>{
      console.log("--- countdown ends")
      this.onComplete.emit()
    })
    this.countDownSubscription = this.timer.countDown$.subscribe((data)=>{
      
      this.countDown = data
      this.cdRef.markForCheck()
    })
  }
  ngOnDestroy(): void {
    this.timer.destroy()
    this.countDownEndSubscription.unsubscribe()
    this.countDownSubscription.unsubscribe()
  }
}
