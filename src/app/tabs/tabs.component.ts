import { AfterContentInit, Component, ContentChild, OnInit, OnDestroy, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { Observable } from 'rxjs';
import { Tab } from "../tab/tab.interface";


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  // @ContentChild(TabComponent) tab:TabComponent
  @ContentChildren(TabComponent) public tabs:QueryList<TabComponent>

  private tabClickSubscriptions:any[] = [];

  constructor() { }
  ngOnDestroy(): void {
    
    if(this.tabClickSubscriptions){
      this.tabClickSubscriptions.forEach(
        item=>item.unsubscribe()
        
      )
    }

  }


  ngAfterContentInit(): void {
    // if(this.tab){
    //   console.log(this.tab)
    //   this.addTab(this.tab)
    //   this.tabClickSubscription = this.tab.onClick.subscribe(()=>{
    //     console.log('tab content clicked')
    //   })
    // }

    this.tabs.forEach(tab=>{
      let subsription= tab.onClick.subscribe(()=>{
        console.log(`tab ${tab.title} clicked`)
        this.tabClickSubscriptions.push(subsription)
      })
    })
    this.selectTab(this.tabs.first)
  }

  ngOnInit() {
    
  }

  

  selectTab(tab:Tab) {
    // for (let tab of this.tabs){
    //   tab.isActive = false;
    // }
    // tab.isActive = true;


    this.tabs.forEach(tab=>{
      tab.isActive = false
    })
    tab.isActive = true

  }
  

}
