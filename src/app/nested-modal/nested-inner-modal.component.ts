import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalRef } from '../modal/modal-ref';
import { MODAL_DATA, MODAL_REF } from '../modal/modal.tokens';

export interface NestedInnerModalData {
    title: string;
    description: string;
    fromOuterParent: string;
}

export interface NestedInnerModalResult {
    text: string;
}

@Component({
    selector: 'app-nested-inner-modal',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './nested-inner-modal.component.html',
})
export class NestedInnerModalComponent {
    protected readonly data = inject(MODAL_DATA) as NestedInnerModalData;
    private readonly modalRef = inject(MODAL_REF) as ModalRef<NestedInnerModalData, NestedInnerModalResult>;

    protected innerText = '';

    close(): void {
        this.modalRef.close({ text: this.innerText });
    }
}
