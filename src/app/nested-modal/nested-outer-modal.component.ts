import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalRef } from '../modal/modal-ref';
import { MODAL_DATA, MODAL_REF } from '../modal/modal.tokens';
import { ModalService } from '../modal/modal.service';
import { NestedInnerModalComponent, NestedInnerModalData, NestedInnerModalResult } from '../nested-modal/nested-inner-modal.component';

export interface NestedOuterModalData {
    title: string;
    description: string;
    fromParent: string;
}

export interface NestedOuterModalResult {
    outerText: string;
    innerText: string;
}

@Component({
    selector: 'app-nested-outer-modal',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './nested-outer-modal.component.html',
})
export class NestedOuterModalComponent {
    private readonly modalService = inject(ModalService);
    protected readonly data = inject(MODAL_DATA) as NestedOuterModalData;
    private readonly modalRef = inject(MODAL_REF) as ModalRef<NestedOuterModalData, NestedOuterModalResult>;

    protected outerText = '';
    // Input text typed in the outer modal to be passed down to the inner modal
    protected messageForInner = '';
    protected innerResultText = signal('');

    openInnerModal(): void {
        const innerData: NestedInnerModalData = {
            title: 'Inner Modal',
            description: 'I am a modal inside another modal! Each one has its own independent context.',
            fromOuterParent: this.messageForInner,
        };

        const innerRef = this.modalService.open<NestedInnerModalData, NestedInnerModalResult>(
            NestedInnerModalComponent,
            { data: innerData },
        );

        innerRef.afterClosed$.subscribe(result => {
            if (result) {
                this.innerResultText.set(result.text);
            }
        });
    }

    close(): void {
        this.modalRef.close({
            outerText: this.outerText,
            innerText: this.innerResultText(),
        });
    }
}
