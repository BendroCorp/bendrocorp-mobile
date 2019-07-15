import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountdownChartComponent } from './countdown-chart.component';
import { TimeSpan } from 'ng-timespan';


describe('CountdownChartComponent', () => {
  let component: CountdownChartComponent;
  let fixture: ComponentFixture<CountdownChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// Test to ensure timespan library is loaded correctly and functioning
describe('Timespan exists and is properly built', () => {

  const timespan = TimeSpan.Subtract(new Date("2018-12-18T20:41:29.447Z").getTime(), new Date("2018-12-19T23:43:33.447Z").getTime())
  
  it('should return a result', () => {
    expect(timespan).not.toBeNull()
  });

  it('should be different by one day', () => {
    expect(timespan.days).toEqual(1) // .to.equal(1)
  })

  it('should be different by three hours', () => {
    expect(timespan.hours).toEqual(3)
  })

  it('should be different by two minutes', () => {
    expect(timespan.minutes).toEqual(2)
  })

  it('should be different by four seconds', () => {
    expect(timespan.seconds).toEqual(4)
  })

  it('should be different by zero milliseconds', () => {
    expect(timespan.milliseconds).toEqual(0)
  })

})
