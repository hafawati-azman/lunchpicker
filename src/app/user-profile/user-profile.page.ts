import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  public user_id;
  public users;
  constructor(
    private storage: Storage,
    private http:HttpClient,
    private router: Router
  ) { }

  ngOnInit() {

    this.storage.get('user_id')
      .then(((val) => {
        this.user_id = val;
        console.log(this.user_id);
        let data = {
          user_id: this.user_id,
        }

        this.http.post('http://127.0.0.1/lp_userprofile.php', data)
          .subscribe((data: any) => {
            console.log(data);
            this.users = data;

          }, (error: any) => {
              console.log(JSON.stringify(error));
            });
      }))
  }

  logout() {
    this.storage.clear();
    this.router.navigateByUrl('/home');
  }

}
