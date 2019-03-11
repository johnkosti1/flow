import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  items: any;

  constructor() {
    this.items = [
      {
        image: '/assets/images/data-join.svg',
        text: 'Data Join'
      },
      {
        image: '/assets/images/command-ico.svg',
        text: 'Command'
      },
      {
        image: '/assets/images/data-compare-ico.svg',
        text: 'Data Compare'
      },
      {
        image: '/assets/images/jirainte-ico.svg',
        text: 'JIRA Integration'
      },
      {
        image: '/assets/images/data-filt-ico.svg',
        text: 'Data Filter'
      },
      {
        image: '/assets/images/api-inte-ico.svg',
        text: 'API Integration'
      },
      {
        image: '/assets/images/mail-ico.svg',
        text: 'Mail'
      },
      {
        image: '/assets/images/data-tra-ico.svg',
        text: 'Data Transformation'
      },
      {
        image: '/assets/images/data-out-ico.svg',
        text: 'Data Output'
      },
      {
        image: '/assets/images/data-quality-ico.svg',
        text: 'Data Quality'
      },
      {
        image: '/assets/images/data-compareico.svg',
        text: 'Data Compare'
      },
      {
        image: '/assets/images/copy-into-dataQ.svg',
        text: 'Copy Data Into DataQ'
      },
      {
        image: '/assets/images/copy-from-dataQ.svg',
        text: 'Copy Data From DataQ'
      },
      {
        image: '/assets/images/embedded-job.svg',
        text: 'Embedded Job'
      }
    ]
  }

  ngOnInit() {
  }

}
