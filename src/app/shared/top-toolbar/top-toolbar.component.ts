import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/jwt/jwt.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
})
export class TopToolbarComponent implements OnInit {
  @Input()
  title = 'Crestron Home';
  user!: { userId: string; username: string } | null;
  firstLetterOfUsername!: string;

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.jwtService.checkCurrentUser();
    this.firstLetterOfUsername = (
      this.user?.username.substring(0, 1) ?? '?'
    ).toUpperCase();
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  signOut() {
    const refreshToken = this.jwtService.getRefreshToken();
    if (!refreshToken) {
      this.router.navigate(['login']);
      return;
    }
    this.authService
      .logout(refreshToken)
      .subscribe(() => this.router.navigate(['login']));
  }
}
