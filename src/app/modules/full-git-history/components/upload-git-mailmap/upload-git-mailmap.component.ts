import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-git-mailmap',
  templateUrl: './upload-git-mailmap.component.html',
  styleUrls: ['./upload-git-mailmap.component.scss']
})
export class UploadGitMailmapComponent implements OnInit {
  fileName: string = '';
  @Output() parsedGitMailmapUploaded: EventEmitter<string[][]> = new EventEmitter<string[][]>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onFileSelected($event: any) {
    const selectedFile = $event.target.files[0];
    this.fileName = selectedFile.name;

    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.parsedGitMailmapUploaded.emit(JSON.parse(fileReader.result));
      }
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }
}
