import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { HostListener } from '@angular/core';




@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})

export class IntroComponent implements OnInit {



  ngOnInit(): void {
    Aos.init();


  }}
