import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ListBase } from 'src/app/global/base-class/List-base';
import { CreateMovieComponent } from '../create-movie/create-movie.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { GridListHelper } from 'src/app/global/helpers/GridListHelper';
import { MoviesserviceService } from '../moviesservice.service';
import { ButtonOptions } from 'src/app/global/helpers/utility-classes';
import { ComponentHelper } from 'src/app/global/helpers/component.helper';
import { CustomDialogHelper } from 'src/app/global/helpers/custom-dialog.helper';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent extends ListBase{
  public editSubjectComponentRef: ComponentRef<CreateMovieComponent>;
  @ViewChild('componentContainer', { static: false, read: ViewContainerRef })
  componentContainer: ViewContainerRef;
  Movies:any[];
  constructor(
    private spin: NgxSpinnerService,
    public gridListHelper: GridListHelper,
    public Service: MoviesserviceService,

    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(spin);
    this.getAllMovies();
  }

  getAllMovies(){
    this.Service.getAllMovie().subscribe((res:any) => {
      console.log(res)
      this.Movies = res;
    })
  }

  public onGrdUsersToolbarPreparing(e: any) {
    this.gridListHelper.getListGrdToolbarItems(
      false,
      e,
      new ButtonOptions('', true, this.onBtnRefreshClick),
      new ButtonOptions('', false, null),
      null
    );
  }

  public onGrdUsersRowClick(e) {
    this.gridListHelper.onDoubleClick(e);
  }

  onBtnRefreshClick = () => {
    this.TogglegridLoadingPanel(true);
    this. getAllMovies();
  };
  datasource: Array<any> = [];
  onBtnAddMovieClicked() {
    this.ShowUserDetails(null);
  }

  ShowUserDetails(entity: any) {
    this.editSubjectComponentRef = ComponentHelper.addComponent(
      this.componentFactoryResolver,
      this.componentContainer,
      CreateMovieComponent
    );
    const detailInstance = this.editSubjectComponentRef.instance;
    if (entity?.id > 0) {
      detailInstance.popupTitle = 'Edit Movie -' + entity.name;
      detailInstance.MovieId = entity.id;
    } else {
      detailInstance.popupTitle = 'Add Subject';
    }

    detailInstance.initData();

    detailInstance.popupHiddenEvent.subscribe((response) => {
      this.isDataProcessing = false;
      if (detailInstance.isDataSaved) {
        // this.initData();
        this.getAllMovies();

      }
      ComponentHelper.removeComponent(
        this.componentContainer,
        this.editSubjectComponentRef
      );
    });
  }

  onBtnEditClick(data){
    this.ShowUserDetails(data);
  }

  onBtnDeleteClick(id){
    this.Service.deleteMovie(id).subscribe((res:any) => {
      CustomDialogHelper.notifySuccessMsg(res.message);
    })
  }
}
