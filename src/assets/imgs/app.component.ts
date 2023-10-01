import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'PowerBIIntegration';
  selectedValue: string = ''; 
  safeUrl: SafeHtml ='';
  
  constructor(private sanitizer: DomSanitizer ,    @Inject(DOCUMENT)  private   document: Document)  {

  }

  ngOnInit(): void {
    this.safeUrl =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/VKM4PPv3UPA");
    this.document.addEventListener('contextmenu', (e:any) => e.preventDefault());
    this.document.onkeydown = (e:any) => {
      // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
      if (
        e.keyCode === 123 ||
        this.ctrlShiftKey(e, 'I') ||
       this. ctrlShiftKey(e, 'J') ||
       this. ctrlShiftKey(e, 'C') ||
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
      )
        return false; 
        else{
          return true;
        }
    };
    
  

  }
  public  ctrlShiftKey(e:any, keyCode:any) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  }

  
}
