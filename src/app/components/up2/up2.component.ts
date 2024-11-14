import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';



@Component({
  selector: 'app-up2',
  standalone: true,
  imports: [

    MatIconModule,
    MatToolbarModule


  ],
  templateUrl: './up2.component.html',
  styleUrl: './up2.component.scss'
})
export class Up2Component {

  imageName = signal('');
  fileSize = signal(0);
  uploadProgress = signal(0);
  imagePreview = signal('');
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  // Handler for file input change
  onFileChange(event: any): void {
    const file = event.target.files[0] as File | null;
    this.uploadFile(file);
  }

  // Handler for file drop
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0] as File | null;
    this.uploadFile(file);
  }

  // Prevent default dragover behavior
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // Method to handle file upload
  uploadFile(file: File | null): void {

    const fileType =file?.type
    const isSupportedType  = ['image/', 'application/pdf'].some((word) => fileType?.startsWith(word));

    console.log(isSupportedType );

    if (file && isSupportedType ) {
      this.selectedFile = file;
      this.fileSize.set(Math.round(file.size / 1024)); // Set file size in KB
        if(fileType?.startsWith('image/')){
          const reader = new FileReader();
          reader.onload = (e) => {
          this.imagePreview.set(e.target?.result as string); // Set image preview URL
         };
          reader.readAsDataURL(file);

          }else{
            this.imagePreview.set("")
          }

      this.uploadSuccess = true;
      this.uploadError = false;
      this.imageName.set(file.name); // Set image name
    } else {
      this.uploadSuccess = false;
      this.uploadError = true;
      this.snackBar.open('Only image files are supported!', 'Close', {
        duration: 3000,
        panelClass: 'error',
      });
    }
  }

  // Method to remove the uploaded image
  removeImage(): void {
    this.selectedFile = null;
    this.imageName.set('');
    this.fileSize.set(0);
    this.imagePreview.set('');
    this.uploadSuccess = false;
    this.uploadError = false;
    this.uploadProgress.set(0);
  }

  isImage(): boolean {
    return this.selectedFile?.type.startsWith('image/') || false;
  }

  isPDF(): boolean {
    return this.selectedFile?.type === 'application/pdf' || false;
  }
}
