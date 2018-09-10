import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing'

import { TrackOrderService } from './track-order.service'

describe('TrackOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrackOrderService]
    })
  })

  it('should be created', inject([TrackOrderService], (service: TrackOrderService) => {
    expect(service).toBeTruthy()
  }))

  it('should get tracking order results directly via the rest api', inject([TrackOrderService, HttpTestingController],
    fakeAsync((service: TrackOrderService, httpMock: HttpTestingController) => {
      let res
      service.save('5267-f9cd5882f54c75a3').subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/rest/track-order/5267-f9cd5882f54c75a3')
      req.flush('apiResponse')

      tick()
      expect(req.request.method).toBe('GET')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))
})