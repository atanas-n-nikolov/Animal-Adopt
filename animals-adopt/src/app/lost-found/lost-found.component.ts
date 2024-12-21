import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-lost-found',
  standalone: true,
  imports: [],
  templateUrl: './lost-found.component.html',
  styleUrl: './lost-found.component.css'
})
export class LostFoundComponent {
  selectedValues: Record<string, string[]> = {};
  private clickListeners: (() => void)[] = [];

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggle(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    const dropdown = target.querySelector('.dropdown') as HTMLElement;
    const selectedOption = target.querySelector('.selected-option') as HTMLElement;
    const filterKey = target.id;

    const isOpen = dropdown.style.display === 'block';
    this.closeAllDropdowns();
    dropdown.style.display = isOpen ? 'none' : 'block';

    this.removeClickListener(target);

    const listener = this.renderer.listen(dropdown, 'click', (event: Event) => {
      const checkbox = event.target as HTMLInputElement;
      if (checkbox.classList.contains('checkbox')) {
        const value = checkbox.closest('.option')?.getAttribute('data-value') || '';

        if (checkbox.checked) {
          if (!this.selectedValues[filterKey]) {
            this.selectedValues[filterKey] = [];
          }
          if (!this.selectedValues[filterKey].includes(value)) {
            this.selectedValues[filterKey].push(value);
          }
        } else {
          this.selectedValues[filterKey] = this.selectedValues[filterKey].filter(
            (item) => item !== value
          );
        }

        this.updateSelectedText(selectedOption, filterKey);
      }
    });

    this.clickListeners.push(listener);
  }

  private updateSelectedText(element: HTMLElement, filterKey: string): void {
    const values = this.selectedValues[filterKey] || [];
    element.textContent = values.length > 0 ? values.join(', ') : this.getPlaceholder(filterKey);
  }

  private getPlaceholder(filterKey: string): string {
    const placeholders: Record<string, string> = {
      'animal-type': 'Type of Animal',
      age: 'Age',
      size: 'Size',
      gender: 'Gender',
      'special-needs': 'Special Needs',
      location: 'Location',
    };
    return placeholders[filterKey] || 'Select';
  }

  private closeAllDropdowns(): void {
    const dropdowns = this.el.nativeElement.querySelectorAll('.dropdown') as NodeListOf<HTMLElement>;
    dropdowns.forEach((dropdown) => {
      dropdown.style.display = 'none';
    });
  }

  private removeClickListener(container: HTMLElement): void {
    this.clickListeners.forEach((listener) => listener());
    this.clickListeners = [];
  }

  clearFilter(): void {
    this.selectedValues = {};
  
    const checkboxes = this.el.nativeElement.querySelectorAll(
      '.checkbox'
    ) as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  
    const selectedOptions = this.el.nativeElement.querySelectorAll(
      '.selected-option'
    ) as NodeListOf<HTMLElement>;
    selectedOptions.forEach((option) => {
      const filterKey = option.closest('.custom-select')?.id || '';
      option.textContent = this.getPlaceholder(filterKey);
    });
  }
}
