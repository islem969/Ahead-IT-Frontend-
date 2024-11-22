import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { SideNavComponent } from '../side-nav/side-nav.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import { DialogModComponent } from '../dialog-mod/dialog-mod.component';
import { User } from '../../model/User';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from '../user-details/user-details.component';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [

     MatFormFieldModule,
     MatInputModule, 
     MatTableModule, 
     MatSortModule, 
     MatPaginatorModule,
     SideNavComponent,
     MatButtonModule, 
     MatDividerModule,
     MatIconModule,
     MatDialogModule,
     DialogAddComponent,
     CommonModule,
     DialogModComponent,
     UserDetailsComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['username','firstName', 'email','PhoneNumber', 'role','action'];
  public users:any[] = [];
  dataSource!: MatTableDataSource<any>;
  readonly dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService) { }
  email = localStorage.getItem("email");
  firstName = localStorage.getItem("firstName");
  role = localStorage.getItem("role");
 
  ngOnInit(): void {
    this.getAllUsers();
    
  }

  

  getAllUsers() {
    this.api.getUsers()
      .subscribe({
        next: (res) => {
          this.users=res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          throw err; // Logging error to console
          // You can handle error display more gracefully, such as using MatSnackBar for notifications
        }
      })
      
  }
  openUserDetails(user: User) {
    this.dialog.open(UserDetailsComponent, {
      data: { user },
      width: "100%",
      maxWidth: "95%",
      panelClass: 'custom-dialog-container', // Classe CSS pour personnaliser le style du dialogue
      position: { top: '50px' }
  
    
    });
  }
  deleteUser(id: number) {
    this.api.deleteUser(id).subscribe({
      next: (res) => {
        console.log('User deleted successfully:', res);
        // Mettez à jour la liste des utilisateurs ou effectuez toute autre action nécessaire après la suppression
        this.getAllUsers();
     // Rechargez la liste des utilisateurs après la suppression
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        // Gérez les messages d'erreur ou les commentaires de l'utilisateur
      }
    });
  }
 /* getAllUsers(){
    this.api.getUsers().subscribe((res:any)=> {
      this.users= res;
      console.log(this.users)
    } , error => {
      alert("Error From API")
    })
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(){
    this.dialog.open(DialogAddComponent,{
      width:'80%'
    });
  }
  editUser(user: User): void {
    this.dialog.open(DialogModComponent, {
      data: { id: user.id }
    });
  }
  /*updateUser(id: number, user: User): User {
    this.api.updateUser(id,user).subscribe(() => {
     this.getAllUsers();
    
   });
    return user;
 }*/
}
  

