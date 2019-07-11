/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ShipLogService } from 'app/entities/ship-log/ship-log.service';
import { IShipLog, ShipLog, EntryType } from 'app/shared/model/ship-log.model';

describe('Service Tests', () => {
  describe('ShipLog Service', () => {
    let injector: TestBed;
    let service: ShipLogService;
    let httpMock: HttpTestingController;
    let elemDefault: IShipLog;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ShipLogService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ShipLog('ID', currentDate, 'AAAAAAA', EntryType.COMMAND);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            datetime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find('123')
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a ShipLog', async () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            datetime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            datetime: currentDate
          },
          returnedFromService
        );
        service
          .create(new ShipLog(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ShipLog', async () => {
        const returnedFromService = Object.assign(
          {
            datetime: currentDate.format(DATE_TIME_FORMAT),
            entrytext: 'BBBBBB',
            entrytype: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetime: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of ShipLog', async () => {
        const returnedFromService = Object.assign(
          {
            datetime: currentDate.format(DATE_TIME_FORMAT),
            entrytext: 'BBBBBB',
            entrytype: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            datetime: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ShipLog', async () => {
        const rxPromise = service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
