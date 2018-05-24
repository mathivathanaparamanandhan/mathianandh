import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { GlobalValues } from '../common/_common';
import {FilterComponent} from '../filter/filter.component';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  backgroundImage: any;

  constructor(private userService: UserService, private titleService: Title) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
    this.loadAllUsers();
    this.titleService.setTitle(GlobalValues.containerTitle);
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }
}
