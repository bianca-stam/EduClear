import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {formatFileSize} from '../utils/file-utils';
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule,} from 'ngx-dropzone-wrapper';

export type UploadedFile = {
    id?: number;
    name: string;
    size: number;
    type: string;
    dataURL?: string;
    loading?: boolean;
    isExisting?: boolean;
};

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    acceptedFiles: 'image/*',
};

@Component({
    selector: 'FileUploader',
    standalone: true,
    imports: [DropzoneModule, NgIcon],
    template: `
        <dropzone
            class="dropzone"
            [config]="dropzoneConfig"
            [message]="dropzone"
            (addedFile)="onFileAdded($event)"
        ></dropzone>
        @if (uploadedFiles) {
            <div class="dropzone-previews mt-3" id="file-previews">
                @for (file of uploadedFiles; track file.name + $index; let index = $index) {
                    <div
                        class="card mt-1 mb-0 border-dashed border"
                    >
                        <div class="p-2">
                            <div class="row align-items-center">
                                <div class="col-auto">
                                    <div class="avatar-sm rounded bg-light d-flex align-items-center justify-content-center">
                                        @if (file.dataURL && file.type && file.type.startsWith('image/')) {
                                            <img
                                                data-dz-thumbnail=""
                                                [src]="file.dataURL"
                                                class="avatar-sm rounded bg-light"
                                                style="object-fit: cover;"
                                            />
                                        } @else {
                                            <ng-icon name="tablerFile" class="fs-24 text-secondary"></ng-icon>
                                        }
                                    </div>
                                </div>
                                <div class="col ps-0">
                                    <a href="javascript:void(0);" class="fw-semibold">{{
                                            file.name
                                        }}</a>
                                    <p class="mb-0 text-muted" data-dz-size="">
                                        <strong>{{ formatFileSize(file.size) }}</strong>
                                    </p>
                                </div>
                                <div class="col-auto">
                                    <a
                                        (click)="removeFile(index)"
                                        class="btn btn-link btn-lg text-danger"
                                        style="cursor: pointer;"
                                    >
                                        <ng-icon name="tablerX"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        }
    `,
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG,
        },
    ],
})
export class FileUploader {
    formatFileSize = formatFileSize;
    
    @Input() uploadedFiles: UploadedFile[] = [];
    @Input() maxFiles: number = 1;
    @Output() fileRemoved = new EventEmitter<UploadedFile>();
    @Output() fileAddedEvent = new EventEmitter<UploadedFile>();

    get dropzoneConfig(): DropzoneConfigInterface {
        return {
            url: 'https://httpbin.org/post',
            maxFilesize: 50,
            maxFiles: this.maxFiles,
            clickable: true,
            addRemoveLinks: true,
            previewsContainer: false,
        };
    }

    dropzone = `
   <div class="needsclick">
             <div class="avatar-lg mx-auto my-3">
                        <span class="avatar-title bg-success-subtle text-success rounded-circle">
                            <span class="fs-24 text-success">
                            <span class="fs-24 upload-icon"></span>
                        </span>
                        </span>
                    </div>
                        <h4 class="mb-2">Drop files here or click to upload.</h4>
                        <p class="text-muted fst-italic mb-3">You can drag images here, or browse files via the button below.</p>
            <span class="d-block pb-3">
                <span type="button" class="btn btn-sm shadow btn-default">Browse Files</span>
            </span>
        </div>`;

    imageURL: string = '';

    onFileAdded(file: any) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const dataUrl = e.target?.result as string;
            const newFile: UploadedFile = {
                name: file.name,
                size: file.size,
                type: file.type,
                dataURL: dataUrl,
            };
            if (this.maxFiles === 1) {
                this.uploadedFiles = [newFile];
            } else {
                this.uploadedFiles.push(newFile);
            }
            this.fileAddedEvent.emit(newFile);
        };
        reader.readAsDataURL(file);
    }

    removeFile(index: number) {
        const file = this.uploadedFiles[index];
        this.fileRemoved.emit(file);
        this.uploadedFiles.splice(index, 1);
    }
}
