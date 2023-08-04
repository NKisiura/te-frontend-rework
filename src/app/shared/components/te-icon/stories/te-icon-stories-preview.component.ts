import * as icons from '../te-icons';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TeIcon } from '@shared/components/te-icon/te-icon.interface';
import { FilterByPropertyPipe } from '@shared/pipes/filter-by-property/filter-by-property.pipe';
import { TeIconName } from '@shared/components/te-icon/te-icon-name.type';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'te-icon-stories-preview',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, FilterByPropertyPipe],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      svg {
        width: 100px;
        height: 100px;
      }
    `,
  ],
  template: `
    <div class="flex flex-col gap-5">
      <div class="flex justify-center">
        <!--        TODO: change native input on custom te-input component-->
        <input
          [(ngModel)]="searchQuery"
          type="text"
          class="w-80 rounded border border-gray-200 p-2"
          placeholder="Search icon by name"
        />
      </div>
      <ng-container
        *ngIf="
          iconsList | filterByProperty : ICON_FILTER_PROPERTY : searchQuery;
          let filteredIconsList
        "
      >
        <ng-container *ngIf="filteredIconsList.length">
          <div
            class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
          >
            <!--            TODO: replace title on tooltip component-->
            <div
              *ngFor="let icon of filteredIconsList"
              (click)="copyToClipboard(icon.name)"
              title="click to copy code"
              class="cursor-pointer rounded border-2 border-gray-200"
            >
              <div
                [innerHTML]="sanitizeSvg(icon.data)"
                class="flex justify-center p-2"
              ></div>
              <div
                class="flex justify-center border-t-2 border-gray-200 p-2 text-2xl"
              >
                {{ icon.name }}
              </div>
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
  private readonly clipboard: Clipboard = inject(Clipboard);
  private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);

  public readonly ICON_FILTER_PROPERTY: keyof TeIcon = 'name';
  public iconsList: TeIcon[] = [];
  public searchQuery = '';

  ngOnInit(): void {
    this.iconsList = Object.values(icons);
  }

  public sanitizeSvg(svgString: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(svgString);
  }

  public copyToClipboard(iconName: TeIconName): void {
    const code = `<te-icon name="${iconName}"></te-icon>`;
    this.clipboard.copy(code);
  }
}
