import { Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { SideNavComponent } from './componets/side-nav/side-nav.component';
import { TableComponent } from './componets/table/table.component';
import { EntityFormComponent } from './componets/entity-form/entity-form.component';
import { UserProfileComponent } from './componets/user-profile/user-profile.component';







export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'nav', component: SideNavComponent},
    {path: 'table', component: TableComponent},
    {path: 'entity', component: EntityFormComponent},
    { path: 'profil', component: UserProfileComponent },
    
     
    
    
];


