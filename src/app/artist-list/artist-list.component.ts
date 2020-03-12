import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  @Input() sortedData: any= new MatTableDataSource();
  displayedColumns: string[];

  constructor() { }
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.displayedColumns = ['index','name', 'popularity','followers','genres'];
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