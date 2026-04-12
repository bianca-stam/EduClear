import { FormsModule } from '@angular/forms';
import { PageTitle } from "@app/components/page-title";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgIcon } from '@ng-icons/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  imports: [PageTitle, FormsModule, PdfViewerModule,NgIcon],
  templateUrl: './pdf-viewer.html',
  styles: ``
})
export class PdfViewer {
 pdfSrc = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
    currentPage = 1;
    totalPages = 0;
    zoom = 1.0;

    afterLoadComplete(pdf: any) {
        this.totalPages = pdf.numPages;
    }

    goToPrevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    goToNextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    zoomIn(): void {
        this.zoom += 0.1;
    }

    zoomOut(): void {
        this.zoom = Math.max(0.1, this.zoom - 0.1);
    }

    zoomFit(): void {
        this.zoom = 1.0;
    }
}
