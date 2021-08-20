import {Component, OnInit} from '@angular/core';
import {genericDataMock, mockUsers} from './mocks/user-mocks';
import {FormControl, Validators} from '@angular/forms';
import {UserModel} from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users = mockUsers;
  bottomData = genericDataMock;
  emailInput: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(3), Validators.email]);
  phoneInput: FormControl = new FormControl('',
    [Validators.required, Validators.pattern('^[0-9]{10}$'),]);
  isEmailSearch = true;
  hasSearched = false;
  searchResults: UserModel[];
  isLoading = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public search(): void {
    this.isLoading = true;
    this.hasSearched = true;
    if (this.isEmailSearch) {
      setTimeout(() => {
        const term = this.emailInput.value;
        this.searchResults = this.users.filter((user) => {
          return user.email.toLowerCase().includes(term);
        });
        this.isLoading = false;
      }, 2000);

    } else {
      setTimeout(() => {
        const term = +this.phoneInput.value;
        this.searchResults = this.users.filter((user) => {
          return user.phones.find(p => p === term);
        });
        this.isLoading = false;
      }, 2000);

    }
  }

  public refreshRoute(): void {
    window.location.reload();
  }

}
