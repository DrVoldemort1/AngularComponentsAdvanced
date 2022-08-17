import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isAddTimerVisible:boolean = false
  public isEndTimerAlerVisible:boolean = false
  public time:number  = 0
  public timers:Array<number> = [];
  constructor() { 
    this.timers = [3,20,185]
  }


  logCountDownEnd= ()=>{
    console.log("the count down has finish")
  }

  public showAddTimer(){
    this.isAddTimerVisible = true;
  }

  public hideAddTimer(){
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert(){
    this.isEndTimerAlerVisible = true
  }
  public hideEndTimerAlert(){
    this.isEndTimerAlerVisible = false
  }
  submitAddTimer = () =>{
    this.timers.push(this.time)
    this.hideAddTimer()
  }



}
