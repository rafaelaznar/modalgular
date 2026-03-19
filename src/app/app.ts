import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoModalComponent, DemoModalData, DemoModalResult } from './demo-modal/demo-modal.component';
import { ModalService } from './modal/modal.service';
import { NestedOuterModalComponent, NestedOuterModalData, NestedOuterModalResult } from './nested-modal/nested-outer-modal.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly modalService = inject(ModalService);

  protected readonly title = 'modalgular';
  // Input text typed by the user in the parent (App) component
  protected appInput = '';
  protected readonly demoResult = signal<string | null>(null);
  protected readonly nestedResult = signal<{ outerText: string; innerText: string } | null>(null);

  openDemoModal(): void {
    const data: DemoModalData = {
      title: 'Demo Modal',
      message: 'Typed data sent from the App component. Write something in the input below and close the modal to see it returned here.',
      badge: 'Basic Demo',
      fromParent: this.appInput,
    };

    const ref = this.modalService.open<DemoModalData, DemoModalResult>(DemoModalComponent, { data });

    ref.afterClosed$.subscribe(result => {
      if (result !== undefined) {
        this.demoResult.set(result.text || '(empty)');
      }
    });
  }

  openNestedModal(): void {
    const data: NestedOuterModalData = {
      title: 'Nested Modal — Outer',
      description: 'This modal has its own context. It can open an inner modal with an independent context. Each modal manages its own state without interfering with the others.',
      fromParent: this.appInput,
    };

    const ref = this.modalService.open<NestedOuterModalData, NestedOuterModalResult>(
      NestedOuterModalComponent,
      { data },
    );

    ref.afterClosed$.subscribe(result => {
      if (result !== undefined) {
        this.nestedResult.set(result);
      }
    });
  }
}
