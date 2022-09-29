import { Component, OnInit } from '@angular/core';
import {InspectionApiService} from "../../inspection-api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {
  inspectionList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;
  inspectionTypesList: any = [];

  //Map to display data associate with foreign key
  inspectionTypesMap: Map<number, string> = new Map();

  constructor(private inspectionApi: InspectionApiService) { }

  ngOnInit(): void {
    this.inspectionList$ = this.inspectionApi.getInspectionList();
    this.inspectionTypesList$ = this.inspectionApi.getInspectionTypesList();
    this.refreshInspectionTypesMap();
  }

  //Variables (properties)
  modalTitle: string = '';
  activateAddEditInspectionComponent: boolean = false;
  inspection: any;

  modalAdd() {
    this.inspection = {
      id: 0,
      status: null,
      comments: null,
      inspectionTypesId: null
    };
    this.modalTitle = 'Add Inspection';
    this.activateAddEditInspectionComponent = true;
  }

  modalEdit(item: any) {
    this.inspection = item;
    this.modalTitle = 'Edit Inspection';
    this.activateAddEditInspectionComponent = true;
  }

  delete(item: any) {
    if(confirm(`Are you sure you want delete inspection ${item['id']}`)){
      this.inspectionApi.deleteInspection(item['id']).subscribe(res => {
        let closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }

        let showDeleteSuccess = document.getElementById('delete-success-alert');
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = 'block';
        }

        setTimeout(() => {
          if(showDeleteSuccess) {
            showDeleteSuccess.style.display = 'none'
          }
        }, 4000)
      })

      this.inspectionList$ = this.inspectionApi.getInspectionList();
    }

  }

  modalClose() {
    this.activateAddEditInspectionComponent = false
    this.inspectionList$ = this.inspectionApi.getInspectionList()
  }

  refreshInspectionTypesMap() {
    this.inspectionApi.getInspectionTypesList().subscribe(data => {
      this.inspectionTypesList = data

      for (let i = 0; i < data.length; i++)
      {
        this.inspectionTypesMap.set(this.inspectionTypesList[i]['id'], this.inspectionTypesList[i]['inspectionName'])
      }
    })
  }
}
