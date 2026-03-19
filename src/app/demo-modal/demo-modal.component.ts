import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalRef } from '../modal/modal-ref';
import { MODAL_DATA, MODAL_REF } from '../modal/modal.tokens';

export interface DemoModalData {
    title: string;
    message: string;
    badge?: string;
    fromParent: string;
}

export interface DemoModalResult {
    text: string;
}

@Component({
    selector: 'app-demo-modal',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './demo-modal.component.html',
})
export class DemoModalComponent {
    protected readonly data = inject(MODAL_DATA) as DemoModalData;
    private readonly modalRef = inject(MODAL_REF) as ModalRef<DemoModalData, DemoModalResult>;

    protected inputText = '';

    close(): void {
        this.modalRef.close({ text: this.inputText });
    }
}
