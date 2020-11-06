import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banco-imagenes',
  templateUrl: './banco-imagenes.component.html',
  styleUrls: ['./banco-imagenes.component.css']
})
export class BancoImagenesComponent implements OnInit {

  tagImagenes: boolean = true;
  tagVideos: boolean;
  tagArch: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  verMultimedia(param: number){
    switch (param) {
      case 1: {
        this.tagImagenes = true;
        this.tagArch = false;
        this.tagVideos = false;
        break;
      }
      case 2: {
        this.tagImagenes = false;
        this.tagArch = false;
        this.tagVideos = true;
        break;
      }
      case 3: {
        this.tagImagenes = false;
        this.tagVideos = false;
        this.tagArch = true;
        break;
      }
    }
  }

}
