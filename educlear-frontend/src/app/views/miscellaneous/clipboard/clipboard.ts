import { Component, inject } from '@angular/core';
import { PageTitle } from "@app/components/page-title";
import { UiCard } from "@app/components/ui-card";
import { ClipboardService } from '@core/services/clipboard.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-clipboard',
  imports: [PageTitle, UiCard, NgIcon ],
  templateUrl: './clipboard.html',
  styles: ``
})
export class Clipboard {
 private clipboard = inject(ClipboardService)

    copyFromElement(el: HTMLElement) {
        const value = (el as HTMLInputElement).value || el.innerText;
        this.clipboard.highlightElementText(el);
        this.clipboard.copyText(value)
    }

    cutFromInput(el: HTMLInputElement | HTMLTextAreaElement) {
        this.clipboard.cutText(el)
    }
}
