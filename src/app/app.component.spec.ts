import { AppComponent } from '@jira-clone/app.component';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  let component: AppComponent;

  const router: any = {
    events: {
      subscribe: jasmine.createSpy('subscribe')
    }
  };
  const projectQuery: any = {};
  const changeDetectorRef: any = {
    detectChanges: jasmine.createSpy('detectChanges')
  };
  const projectService: any = {
    setLoading: jasmine.createSpy('setLoading').and.callThrough()
  };
  const googleAnalyticsService: any = {
    sendPageView: jasmine.createSpy('sendPageView').and.callThrough()
  };

  beforeEach(() => {
    environment.production = true;
    component = new AppComponent(
      router,
      projectQuery,
      changeDetectorRef,
      projectService,
    );
  });
  it('should be able to set Loading', () => {
    expect(router.events.subscribe).toHaveBeenCalled();
    expect(projectService.setLoading).toHaveBeenCalledWith(true);
  });
  it('should be able to make ng After View Init', () => {
    component.ngAfterViewInit();
    expect(changeDetectorRef.detectChanges).toHaveBeenCalled();
  });
});
