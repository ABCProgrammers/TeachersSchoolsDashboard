import { Component } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '../../core/services/http.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  items = [{ column1:1, column2:1}];
  activeIds: string[] = [];
  toggleAccordion(index: number): void {
    const itemId = `item-${index}`;
    const indexInActiveIds = this.activeIds.indexOf(itemId);

    if (indexInActiveIds !== -1) {
      // Remove if already in activeIds
      this.activeIds.splice(indexInActiveIds, 1);
    } else {
      // Add to activeIds if not present
      this.activeIds.push(itemId);
    }
  }
}
