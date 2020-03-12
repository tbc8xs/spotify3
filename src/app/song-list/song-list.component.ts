import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChange } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Track } from '../objects/tracks';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit{

  @Input() sortedData: any = new MatTableDataSource();
  @Input() timePeriod: string;
  displayedColumns: string[];
  //sortedData: any = new MatTableDataSource();

  constructor() { 
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    //console.log(this.allSongs);
    this.displayedColumns = ['index','title', 'artist','album','popularity'];
    //this.sortedData = this.allSongs;
    
  }


  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'index': return compare(a.index, b.index, isAsc);
        case 'popularity': return compare(a.popularity, b.popularity, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}