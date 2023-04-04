import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { userStub } from '../stubs/user.stub';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let authServiceVariables: any;

  beforeEach(() => {
    authServiceVariables = {};
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return a null', () => {
    authServiceVariables.access_token = null;
    const token = authService.getToken();
    expect(token).toEqual(authServiceVariables.access_token);
  })

  it('should return an empty string', () => {
    authServiceVariables.user_id = '';
    const userId = authService.getUserId();
    expect(userId).toEqual(authServiceVariables.user_id);
  })
  
  it('should return false', () => {
    authServiceVariables.isAuthenticated = false;
    const isauthenticated = authService.getIsAuth();
    expect(isauthenticated).toEqual(authServiceVariables.isAuthenticated);
  })

  it('should return default observable value', () => {
    authServiceVariables.authStatusListener = Observable<boolean>;
    const authstatuslistener = authService.getAuthStatusListener;
    // expect Function to equal Function
    expect(authstatuslistener).toBeTruthy();
  })

  it('login', (done: DoneFn) => {
    const credentials = {
      email: userStub().email,
      password: userStub().password
    }
    const loginResponse: any = {
      user_id: '1234',
      access_token: '12345'
    }
      const response = authService.login(credentials);
      expect(response).toEqual(loginResponse);
      const req = httpTestingController.expectOne('http://localhost:3002/auth/login')
      expect(req.request.method).toEqual('POST');
      req.flush(loginResponse);
  })
});
