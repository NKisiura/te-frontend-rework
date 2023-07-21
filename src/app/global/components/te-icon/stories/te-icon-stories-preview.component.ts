import * as icons from '../te-icons';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TeIcon } from '@global/components/te-icon/te-icon.interface';
import { FilterByPropertyPipe } from '@global/pipes/filter-by-property/filter-by-property.pipe';

@Component({
  selector: 'te-icon-stories-preview',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, FilterByPropertyPipe],
  template: `
    <div class="flex flex-col gap-5">
      <div class="flex items-center gap-5">
        <div class="text-xl">Search Icon:</div>
        <!--        TODO: change native input on custom te-input component-->
        <input
          type="text"
          class="border border-black rounded"
          [(ngModel)]="searchQuery"
        />
      </div>
      <ng-container
        *ngIf="
          iconsList | filterByProperty : ICON_FILTER_PROPERTY : searchQuery;
          let filteredIconsList
        "
      >
        <ng-container *ngIf="filteredIconsList.length">
          <div class="flex flex-wrap gap-5">
            <div
              *ngFor="let icon of filteredIconsList"
              class="flex flex-col items-center"
            >
              <div [innerHTML]="sanitizeSvg(icon.data)"></div>
              <div class="text-2xl">{{ icon.name }}</div>
            </div>
          </div>
        </ng-container>
        <ng-container *ngIf="!filteredIconsList.length">
          <div class="text-2xl">Nothing found by name: {{ searchQuery }}</div>
        </ng-container>
      </ng-container>
    </div>
  `,
})
export class TeIconStoriesPreviewComponent implements OnInit {
  public readonly ICON_FILTER_PROPERTY: keyof TeIcon = 'name';
  public iconsList: TeIcon[] = [];
  public searchQuery = '';

  constructor(private readonly domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.iconsList = Object.values(icons);
  }

  public sanitizeSvg(svgString: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(svgString);
  }
}
