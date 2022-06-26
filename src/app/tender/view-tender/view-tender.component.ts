import { Component, Injectable, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { DateModel } from 'src/app/models/Date.model';
import { TenderForm } from 'src/app/models/tender-form.model';
import { Tender } from 'src/app/models/tender.model.';
import { NotificationService } from 'src/app/services/notification.service';
import { TenderService } from 'src/app/services/tender.service';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

@Component({
  selector: 'app-view-tender',
  templateUrl: './view-tender.component.html',
  styleUrls: ['./view-tender.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class ViewTenderComponent implements OnInit {
  form!: FormGroup;
  tenderId: string | null | undefined;
  action: string | null | undefined;
  title!: string;
  submitted = false;

  tender: Tender = {
    id: '',
    name: '',
    referenceNumber: '',
    releaseDate: '',
    closingDate: '',
    description: '',
    userId: '',
    user: {
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
    },
  };

  tenderForm: TenderForm = {
    id: '',
    name: '',
    referenceNumber: '',
    releaseDate: {
      day: 0,
      month: 0,
      year: 0,
    },
    releaseTime: {
      hour: 0,
      minute: 0,
      second: 0,
    },
    closingDate: {
      day: 0,
      month: 0,
      year: 0,
    },
    closingTime: {
      hour: 0,
      minute: 0,
      second: 0,
    },
    description: '',
    userId: '',
  };

  constructor(
    private readonly tenderService: TenderService,
    private readonly route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    const now = new Date();
    var todayDate = {
      day: now.getUTCDate(),
      month: now.getUTCMonth(),
      year: now.getUTCFullYear(),
    };
    var todayTime = {
      hour: now.getUTCHours(),
      minute: now.getUTCMinutes(),
      second: now.getUTCSeconds(),
    };

    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        referenceNumber: ['', [Validators.required]],
        releaseDate: [todayDate, [Validators.required]],
        releaseTime: [todayTime, [Validators.required]],
        closingDate: [todayDate, [Validators.required]],
        closingTime: [todayTime, [Validators.required]],
        description: ['', [Validators.required]],
      },
      { validator: this.validateDates }
    );
  }

  validateDates(form: AbstractControl): ValidationErrors | null {
    const r: DateModel = form.get('releaseDate')!.value;
    const c: DateModel = form.get('closingDate')!.value;
    const now = new Date();
    let errors: ValidationErrors = {};

    var releaseDate = new Date(Date.UTC(r.year, r.month, r.day));
    var closingDate = new Date(Date.UTC(c.year, c.month, c.day));

    if (closingDate < releaseDate) {
      errors['dates'] = 'Closing date should be greater than release date';
    }

    if (closingDate < now) {
      errors['closingdates'] = 'Closing date should be in future date';
    }

    if (releaseDate < now) {
      errors['releasedates'] = 'Release date should be in future date';
    }

    return errors;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tenderId = params.get('id');
      this.action = params.get('action');

      switch (this.action) {
        case 'view':
          this.title = 'View';
          break;
        case 'edit':
          this.title = 'Edit';
          break;
        default:
          this.title = 'View';
      }

      if (this.tenderId && this.action != 'create') {
        this.tenderService.getTender(this.tenderId).subscribe({
          next: (data) => {
            this.tender = data;

            var releaseDate = {
              day: new Date(this.tender.releaseDate).getUTCDate(),
              month: new Date(this.tender.releaseDate).getUTCMonth(),
              year: new Date(this.tender.releaseDate).getUTCFullYear(),
            };

            var releaseTime = {
              hour: new Date(this.tender.releaseDate).getUTCHours(),
              minute: new Date(this.tender.releaseDate).getUTCMinutes(),
              second: new Date(this.tender.releaseDate).getUTCSeconds(),
            };

            var closingDate = {
              day: new Date(this.tender.closingDate).getUTCDate(),
              month: new Date(this.tender.closingDate).getUTCMonth(),
              year: new Date(this.tender.closingDate).getUTCFullYear(),
            };

            var closingTime = {
              hour: new Date(this.tender.closingDate).getUTCHours(),
              minute: new Date(this.tender.closingDate).getUTCMinutes(),
              second: new Date(this.tender.closingDate).getUTCSeconds(),
            };

            // this.form.valueChanges.subscribe((val) => {
            //   console.log(val);
            // });

            this.tenderForm.id = data.id;
            this.tenderForm.name = data.name;
            this.tenderForm.referenceNumber = data.referenceNumber;
            this.tenderForm.releaseDate = releaseDate;
            this.tenderForm.releaseTime = releaseTime;
            this.tenderForm.closingDate = closingDate;
            this.tenderForm.closingTime = closingTime;
            this.tenderForm.description = data.description;
            this.tenderForm.userId = data.userId;

            this.form.patchValue(this.tenderForm);
            if (this.action == 'view') {
              this.form.get('name')!.disable();
              this.form.get('referenceNumber')!.disable();
              this.form.get('releaseDate')!.disable();
              this.form.get('releaseTime')!.disable();
              this.form.get('closingDate')!.disable();
              this.form.get('closingTime')!.disable();
              this.form.get('description')!.disable();
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  onCreateOrUpdate() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(this.action);
    if (this.action == 'create') {

      this.tenderService.createTender(this.form.value).subscribe({
        next: (data) => {
          this.notifyService.showSuccess(
            'Tender created succesfully',
            'Success'
          );
          this.router.navigateByUrl('tender');
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.tenderService
        .updateTender(this.tenderId!, this.form.value)
        .subscribe({
          next: (data) => {
            this.notifyService.showSuccess(
              'Tender updated succesfully',
              'Success'
            );
            this.router.navigateByUrl('tender');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
