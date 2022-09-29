import {Component, Input, OnInit} from '@angular/core';
import {InspectionApiService} from "../../inspection-api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css']
})
export class AddEditInspectionComponent implements OnInit {
  inspectionList$!: Observable<any[]>
  statusList$!: Observable<any[]>
  inspectionTypesList$!: Observable<any[]>

  @Input() inspection: any;
  id: number = 0;
  status: string = '';
  comments: string = '';
  inspectionTypeId!: number;

  constructor(private inspectionAPI: InspectionApiService) { }

  ngOnInit(): void {
    this.id = this.inspection['id']
    this.status = this.inspection['status']
    this.comments = this.inspection['comments']
    this.inspectionTypeId = this.inspection['inspectionTypeId']
    this.statusList$ = this.inspectionAPI.getStatusList()
    this.inspectionList$ = this.inspectionAPI.getInspectionList()
    this.inspectionTypesList$ = this.inspectionAPI.getInspectionTypesList()
  }

  addInspection() {
    let inspection = {
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId
    }

    this.inspectionAPI.addInspection(inspection).subscribe(res => {
      let closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      let showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = 'block';
      }

      setTimeout(() => {
        if(showAddSuccess) {
          showAddSuccess.style.display = 'none'
        }
      }, 4000)
    })
  }

  updateInspection() {
    let inspection = {
      id: this.id,
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId
    }

    let id: number = this.id;

    this.inspectionAPI.updateInspection(id, inspection).subscribe(res => {
      let closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      let showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = 'block';
      }

      setTimeout(() => {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = 'none'
        }
      }, 4000)
    })
  }
}
