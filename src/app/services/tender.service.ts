import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TenderForm } from '../models/tender-form.model';
import { TenderUpdate } from '../models/tender-update.model';
import { Tender } from '../models/tender.model.';

@Injectable({
  providedIn: 'root',
})
export class TenderService {
  private baseApiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getTenders(): Observable<Tender[]> {
    return this.httpClient.get<Tender[]>(this.baseApiUrl + '/tender');
  }

  getTender(tenderId: string): Observable<Tender> {
    return this.httpClient.get<Tender>(this.baseApiUrl + '/tender/' + tenderId);
  }

  deletetender(tenderId: string): Observable<number> {
    return this.httpClient.delete<number>(
      this.baseApiUrl + '/tender/' + tenderId
    );
  }

  updateTender(
    tenderId: string,
    tenderRequest: TenderForm
  ): Observable<TenderUpdate> {
    const now = new Date();

    var releaseDate = new Date(
      Date.UTC(
        tenderRequest.releaseDate.year,
        tenderRequest.releaseDate.month,
        tenderRequest.releaseDate.day,
        tenderRequest.releaseTime.hour,
        tenderRequest.releaseTime.minute,
        tenderRequest.releaseTime.second,
        now.getUTCMilliseconds()
      )
    );

    var closingDate = new Date(
      Date.UTC(
        tenderRequest.closingDate.year,
        tenderRequest.closingDate.month,
        tenderRequest.closingDate.day,
        tenderRequest.closingTime.hour,
        tenderRequest.closingTime.minute,
        tenderRequest.closingTime.second,
        now.getUTCMilliseconds()
      )
    );

    const updateTenderRequest: TenderUpdate = {
      name: tenderRequest.name,
      referenceNumber: tenderRequest.referenceNumber,
      releaseDate: releaseDate.toISOString(),
      closingDate: closingDate.toISOString(),
      description: tenderRequest.description,
      userId: '',
    };

    return this.httpClient.put<TenderUpdate>(
      this.baseApiUrl + '/tender/' + tenderId,
      updateTenderRequest
    );
  }

  createTender(tenderRequest: TenderForm): Observable<Tender> {
    const now = new Date();

    var releaseDate = new Date(
      Date.UTC(
        tenderRequest.releaseDate.year,
        tenderRequest.releaseDate.month,
        tenderRequest.releaseDate.day,
        tenderRequest.releaseTime.hour,
        tenderRequest.releaseTime.minute,
        tenderRequest.releaseTime.second,
        now.getUTCMilliseconds()
      )
    );

    var closingDate = new Date(
      Date.UTC(
        tenderRequest.closingDate.year,
        tenderRequest.closingDate.month,
        tenderRequest.closingDate.day,
        tenderRequest.closingTime.hour,
        tenderRequest.closingTime.minute,
        tenderRequest.closingTime.second,
        now.getUTCMilliseconds()
      )
    );

    const createTenderRequest: TenderUpdate = {
      name: tenderRequest.name,
      referenceNumber: tenderRequest.referenceNumber,
      releaseDate: releaseDate.toISOString(),
      closingDate: closingDate.toISOString(),
      description: tenderRequest.description,
      userId: localStorage.getItem('userId')!,
    };

    return this.httpClient.post<Tender>(
      this.baseApiUrl + '/tender',
      createTenderRequest
    );
  }
}
