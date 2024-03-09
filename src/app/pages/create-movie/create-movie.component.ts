import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MoviesserviceService } from '../moviesservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalClass } from 'src/app/global/helpers/globalClass';
import { DetailBase } from 'src/app/global/base-class/Detail-base';
import { ButtonOptions } from 'src/app/global/helpers/utility-classes';
import { CustomDialogHelper } from 'src/app/global/helpers/custom-dialog.helper';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent extends DetailBase implements OnInit {
  rForm:FormGroup;
  Movies:any[];
  @Input() MovieId:any;
  popupToolbarItems: Array<any> = [];

  constructor(public fb:FormBuilder, public service:MoviesserviceService,
    public spin: NgxSpinnerService,
    public global: GlobalClass){
      super(spin);

  }

  ngOnInit(): void {
    console.log(this.MovieId)
    this.rForm =this.fb.group({
      id:new FormControl(0),
      movie:new FormControl(null,Validators.required),
      category:new FormControl(null,Validators.required),
      releaseyear:new FormControl(null,Validators.required)
    });
    this.initPopupToolbarItems()
    this.Movies = [
      {id:"1",name:"hollywood"},
      {id:"2",name:"bollywood"},
      {id:"3",name:"wollywood"},
      {id:"4",name:"South"},
      {id:"5",name:"Gujarati"},
      {id:"6",name:"Comedy"},
    
    ];

    if(this.MovieId >0){
      this.service.getMovieById(this.MovieId).subscribe(res =>{
        this.global.set_Value_From_Object_To_rForm(res,this.rForm)
      })
    }
  }

  private initPopupToolbarItems(): void {
    this.popupToolbarItems = super.getTrowserToolbarItems(
      new ButtonOptions('', false, null),
      new ButtonOptions(
        'Cancel',
        true,
        this.onBtnCancelClick,
        this.isDataProcessing
      ),
      new ButtonOptions('', false, null, this.isDataProcessing),
      new ButtonOptions('Save', true, this.onBtnSaveClick, this.isDataProcessing),
      new ButtonOptions('', false, null, this.isDataProcessing),
      new ButtonOptions('', false, null, this.isDataProcessing)
    );
  }

  onBtnCancelClick = () => {};

  onBtnSaveClick = () => {
    if (this.rForm.valid) {
      if( this.rForm.value.id > 0){
        this.service.UpdateMovie(this.rForm.value).subscribe(
          (res: any) => {
              this.popupVisible = false;
              this.isDataSaved = true;
              CustomDialogHelper.notifySuccessMsg(res.message);
            }
        );
      }else{
        this.service.InsertMovie(this.rForm.value).subscribe(
          (res: any) => {
              this.popupVisible = false;
              this.isDataSaved = true;
              CustomDialogHelper.notifySuccessMsg("Created SuccessFully");
            }
        );
      }
    } else {
      CustomDialogHelper.notifyErrorMsg('Please Fill all Required Fields');
    }
  };


  initData(){
    this.popupVisible = true;

  }
  onPopupHiding(e: any) {}
  @HostListener('window:resize', ['$event'])
  public onLookupPopupInitialized(e) {
    if (window.innerWidth > 767 && window.innerWidth < 991) {
      this.popupWidth = 500;
      this.popupHeight = 'auto';
    } else if (window.innerWidth > 991) {
      this.popupWidth = 800;
      this.popupHeight = 'auto';
    } else {
      this.popupWidth = window.innerWidth - 15;
      this.popupHeight = 'auto';
    }
  }
}
