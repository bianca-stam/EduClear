import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss'
})
export class ConfirmModal {
  @Input() isOpen = false;
  @Input() title = 'Confirmar eliminación';
  @Input() message = '¿Estás seguro de que deseas eliminar este elemento?';
  @Input() itemName = '';
  @Input() confirmText = 'Eliminar';
  @Input() cancelText = 'Cancelar';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
