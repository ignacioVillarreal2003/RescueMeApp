import { Injectable } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {map, Observable} from 'rxjs';
import {PetQueryParams} from '../models/pet-query-params';

@Injectable({
  providedIn: 'root'
})
export class PetFilterService {

  constructor(private route: ActivatedRoute, private router: Router) {}

  getFilterParams(): Observable<PetQueryParams> {
    return this.route.queryParams.pipe(
      map((p: Params) => ({
        age: p['age'] ? +p['age'] : undefined,
        sex: Array.isArray(p['sex']) ? p['sex'] : p['sex'] ? [p['sex']] : undefined,
        species: Array.isArray(p['species']) ? p['species'] : p['species'] ? [p['species']] : undefined,
        size: Array.isArray(p['size']) ? p['size'] : p['size'] ? [p['size']] : undefined,
        page: p['page'] ? +p['page'] : undefined
      }))
    );
  }

  setFilterParams(params: PetQueryParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }
}
