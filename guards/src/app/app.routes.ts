import { Routes } from '@angular/router';
import { Bonbon } from './Component/bonbon/bonbon';
import { Caramel } from './Component/caramel/caramel';
import { Eau } from './Component/eau/eau';
import { apiGuardGuard } from './guards/api-guard-guard';
import { Sel } from './Component/sel/sel';
import { Parent } from './Component/parent/parent';

export const routes: Routes = [

  { path: '', component: Parent, children: [
        { path: 'sel', component: Sel },
        { path: 'caramelAuSel', component: Caramel, canActivate:[apiGuardGuard] },
        { path: 'bonbon', component: Bonbon},
        { path: 'eau', component: Eau},
      ]},
      { path: '**', redirectTo: '/'}



];
