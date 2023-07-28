import { Meta, StoryObj } from '@storybook/angular';
import { Component, inject } from '@angular/core';
import { cssVariables } from '../../utils/css-colors-gatherer/color-palette-variables';
import { NgClass, NgForOf } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';

interface RGB {
  r: number;
  g: number;
  b: number;
}

// TODO: replace <input/> by te-input
// TODO: replace titles with te-tooltip
@Component({
  selector: 'app-color-palette',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center mb-2">
      <input
        #closestColorInput
        type="text"
        style="width: 300px;"
        class="form-control rounded border p-2"
        placeholder="Enter HEX to find closest color"
        (keyup.enter)="findClosestColor(closestColorInput.value)"
      />
    </div>
    <div class="palette-container">
      <ng-container *ngFor="let variable of variablesList">
        <div class="palette-item">
          <div
            class="color-block"
            [style]="'background-color: ' + variable.hex + ';'"
            (click)="copyToClipboard(variable.hex)"
            title="Click to copy HEX value"
          ></div>
          <div
            class="variable-name"
            (click)="copyToClipboard(variable.name)"
            title="Click to copy variable name"
          >
            {{ variable.name }}
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .palette-container {
        display: grid;
        grid-template-columns: repeat(9, minmax(0, 1fr));
        gap: 1rem 0.5rem;

        .palette-item {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 0.25rem;
          border: 2px solid #e9ecef;

          .color-block {
            height: 3rem;
            cursor: pointer;
          }

          .variable-name {
            padding: 0.5rem;
            font-size: 0.75rem;
            text-align: center;
            border-top: 2px solid #e9ecef;
            cursor: pointer;

            &:hover {
              background-color: #f8f9fa;
            }
          }
        }
      }

      .justify-content-center {
        display: flex;
        justify-content: center;
      }
    `,
  ],
  imports: [NgForOf, NgClass],
})
class ColorPaletteStoryComponent {
  private clipboard = inject(Clipboard);

  private variablesListFull = cssVariables;
  public variablesList = [...this.variablesListFull];

  public copyToClipboard(textToCopy: string) {
    this.clipboard.copy(textToCopy);
  }

  public findClosestColor(color: string) {
    if (!this.isHEX(color)) {
      // TODO: replace with input error message, validator maybe
      console.error('Wrong color format');
      this.variablesList = this.variablesListFull;
      return;
    }

    if (color.startsWith('#')) {
      color = color.slice(1);
    }

    const rgb = this.hexToRGB(color);

    const diffList = this.variablesListFull.map(variable => {
      return this.getColorsDiff(variable.rgb, rgb);
    });

    const index = diffList.indexOf(Math.min(...diffList));

    this.variablesList = [this.variablesListFull[index]];
  }

  private isHEX(hexString: string) {
    return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hexString);
  }

  private hexToRGB(hexString: string) {
    let r = '0',
      g = '0',
      b = '0';

    // 3 digits
    if (hexString.length == 3) {
      r = '0x' + hexString[0] + hexString[0];
      g = '0x' + hexString[1] + hexString[1];
      b = '0x' + hexString[2] + hexString[2];

      // 6 digits
    } else if (hexString.length == 6) {
      r = '0x' + hexString[0] + hexString[1];
      g = '0x' + hexString[2] + hexString[3];
      b = '0x' + hexString[4] + hexString[5];
    }

    return { r: +r, g: +g, b: +b };
  }

  private getColorsDiff(color1: RGB, color2: RGB) {
    return Math.sqrt(
      Math.pow(color1.r - color2.r, 2) +
        Math.pow(color1.g - color2.g, 2) +
        Math.pow(color1.b - color2.b, 2)
    );
  }
}

const meta: Meta = {
  title: 'Color Palette',
  component: ColorPaletteStoryComponent,
};

export default meta;
type Story = StoryObj<ColorPaletteStoryComponent>;

export const Preview: Story = {};
