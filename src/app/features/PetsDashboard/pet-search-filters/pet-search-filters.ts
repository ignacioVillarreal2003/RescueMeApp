import {Component, ViewChild} from '@angular/core';
import {Modal} from "../../../shared/components/modal/modal";
import {OptionsFilter} from "../../../shared/components/filters/options-filter/options-filter";
import {RangeFilter} from "../../../shared/components/filters/range-filter/range-filter";
import {TextBtn} from "../../../shared/components/buttons/text-btn/text-btn";
import {Subject, takeUntil} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {PetFilterService} from '../../../core/services/pet-filter-service';
import {SexValues, SizeValues, SpeciesValues} from '../../../core/constants/pet-filter.constants';

@Component({
  selector: 'app-pet-search-filters',
    imports: [
        Modal,
        OptionsFilter,
        RangeFilter,
        TextBtn
    ],
  templateUrl: './pet-search-filters.html',
  styleUrl: './pet-search-filters.css'
})
export class PetSearchFilters {
  protected readonly SexValues: string[] = [...SexValues];
  protected readonly SizeValues: string[] = [...SizeValues];
  protected readonly SpeciesValues: string[] = [...SpeciesValues];
  @ViewChild('ageFilter') ageFilter!: RangeFilter;
  @ViewChild('sexFilter') sexFilter!: OptionsFilter;
  @ViewChild('sizeFilter') sizeFilter!: OptionsFilter;
  @ViewChild('specieFilter') speciesFilter!: OptionsFilter;
  age: number = 30;
  sexList: string[] = [];
  speciesList: string[] = [];
  sizeList: string[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dialogRef: MatDialogRef<PetSearchFilters>,
              private petFilterService: PetFilterService) {
  }

  ngOnInit(): void {
    this.petFilterService.getFilterParams()
      .pipe(takeUntil(this.destroy$))
      .subscribe(fp => {
        this.age = fp.age ?? this.age;
        this.sexList = fp.sex ?? [];
        this.sizeList = fp.size ?? [];
        this.speciesList = fp.species ?? [];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilters(): void {
    this.petFilterService.setFilterParams({
      age: this.ageFilter.getValue(),
      sex: this.sexFilter.getSelectedValues(),
      species: this.speciesFilter.getSelectedValues(),
      size: this.sizeFilter.getSelectedValues()
    });

    this.close();
  }

  resetFilters(): void {
    this.ageFilter.reset();
    this.sexFilter.reset();
    this.speciesFilter.reset();
    this.sizeFilter.reset();
  }

  close(): void {
    this.dialogRef.close();
  }
}

