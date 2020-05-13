import { Component, Input } from '@angular/core';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
})
export class TableRowComponent {
  @Input() item: any
}
