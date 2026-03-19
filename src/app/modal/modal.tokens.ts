import { InjectionToken } from '@angular/core';
import type { ModalRef } from './modal-ref';

export const MODAL_DATA = new InjectionToken<unknown>('MODAL_DATA');
export const MODAL_REF = new InjectionToken<ModalRef>('MODAL_REF');
