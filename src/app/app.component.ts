import { AfterViewInit, Component, ViewChild, AfterContentInit } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit{
  public isAddTimerVisible:boolean = false
  public isEndTimerAlerVisible:boolean = false
  public time:number  = 0
  public timers:Array<number> = [];


  @ViewChild(SimpleAlertViewComponent) alert:SimpleAlertViewComponent;


  constructor() { 
    this.timers = [3,20,185]
  }

  ngAfterContentInit(): void {
    this.alert.show()
    this.alert.title = 'Hi'
    this.alert.message = 'Message from ViewChild'
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
