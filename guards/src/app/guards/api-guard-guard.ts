import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';

export const apiGuardGuard: CanActivateFn = (route, state) => {

  let sucre = localStorage.getItem("sucre")
  let sel = localStorage.getItem("sel")

  if(!sucre && !sel){
     return createUrlTreeFromSnapshot(route, ["/eau"]);
  }
  else if(sucre && !sel){
     return createUrlTreeFromSnapshot(route, ["/bonbon"]);
  }
  else if(!sucre && sel){
     return createUrlTreeFromSnapshot(route, ["/sel"]);
  }
  else
  return true;
};
