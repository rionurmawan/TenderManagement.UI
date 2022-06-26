import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../component/confirmation-dialog/confirmation-dialog.service';
import { Tender } from '../models/tender.model.';
import { NotificationService } from '../services/notification.service';
import { TenderService } from '../services/tender.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  tenders: Tender[] = [];

  constructor(
    private readonly tenderService: TenderService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTenders();
  }

  loadTenders() {
    this.tenderService.getTenders().subscribe({
      next: (data) => {
        this.tenders = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  public openConfirmationDialog(tenderId: string) {
    this.confirmationDialogService
      .confirm('Confirm', 'Delete this tender ?')
      .then((confirmed) => {
        if (confirmed) {
          this.tenderService.deletetender(tenderId).subscribe({
            next: (data) => {
              this.notifyService.showSuccess(
                'Tender deleted succesfully',
                'Success'
              );
              this.loadTenders();
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      })
      .catch(() => {});
  }
}
