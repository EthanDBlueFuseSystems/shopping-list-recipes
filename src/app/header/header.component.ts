import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() featureSelected = new EventEmitter<string>();
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

  ngOnInit(){
    console.log("Header Loaded")
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
    });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onLogout(){
    this.authService.logout();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
  }
  
}
