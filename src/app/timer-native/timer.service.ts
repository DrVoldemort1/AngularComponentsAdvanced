import { ChangeDetectionStrategy, Injectable } from "@angular/core"; 
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class TimerService{

    private countdownTimerRef:any = null;
    public pause:boolean = true;
    private init:number = 0;
    private countDownEndSource = new Subject<void>();
    private countDownSource = new BehaviorSubject<number>(0);
    public countDownEnd$ = this.countDownEndSource.asObservable();
    public countDown$ = this.countDownSource.asObservable()

    constructor(){

    }

    
  destroy():void{
    
    this.clearTimeout();
  }

  restartCountdown(init?){
    if(init){
        this.init = init
    }
    if(this.init && this.init >0){
      this.pause = true
      this.clearTimeout();
      this.countDownSource.next(this.init)
    }
  }


  toogleCountDown = ()=>{
    this.pause = !this.pause;

    (!this.pause) ? this.doCountdown() : this.clearTimeout()
  }

  private doCountdown(){
    this.countdownTimerRef = setTimeout(()=>{
      this.countDownSource.next(this.countDownSource.getValue() -1)
      this.processCountdown();
    }, 1000);
  }

  private processCountdown(){
    if(this.countDownSource.getValue() == 0){
        this.countDownEndSource.next();
    }
    else{
      this.doCountdown();
    }
  }

  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }


}