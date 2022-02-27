import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IFullGitHistory } from '../../interfaces/full-git-history.interface';

@Component({
  selector: 'app-upload-full-git-history',
  templateUrl: './upload-full-git-history.component.html',
  styleUrls: ['./upload-full-git-history.component.scss']
})
export class UploadFullGitHistoryComponent implements OnInit {
  fileName: string = '';
  @Output() parsedGitHistoryUploaded: EventEmitter<IFullGitHistory> = new EventEmitter<IFullGitHistory>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onFileSelected($event: any) {
    const selectedFile = $event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.parsedGitHistoryUploaded.emit(JSON.parse(fileReader.result));
      }
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }
}
