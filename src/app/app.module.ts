
/*
      ************ app.module.ts **********
      ***********************************************************************************************************
      *** An Angular module class describes how
      the application parts fit together. Every application
      has at least one Angular module, the root module that
      you bootstrap to launch the application. You can call
      it anything you want. The conventional name is AppModule.

      *** Whenever we create a component / pipes in this project, it is getting imported in this app.module.ts for this project automatically
      *** If we install a package for this project, then we have to import its module into  app.module.ts manually.
      ***********************************************************************************************************

      ************************************ Packages Used in this project ****************************************

      * angular/material - (DOCUMANTATION URL - https://v12.material.angular.io/)

                   -- ng add @angular/material
                     * version - '12.2.13'

        ** Used for  material datatable,
           material drag and drop menu list,
           material menu, material tooltip,
           material dialogbox,
           material accordian,
           material icon,
           material toogle slider,
           material check box,
           material radio button,
           material button,
           material list,
           material divider
        **

      ------------------------------------------------------------
      * Social Sharing - (DOCUMANTATION URL - https://ngx-sharebuttons.netlify.app/#/)

                   -- npm i ngx-sharebuttons
                      * version - '9.0.0'
                   -- npm i @fortawesome/angular-fontawesome
                      * version - '0.10.1'
                   -- npm i @fortawesome/fontawesome-svg-core
                      * version - '1.2.36'
                   -- npm i @fortawesome/free-brands-svg-icons
                      * version - '5.15.4'
                   -- npm i @fortawesome/free-solid-svg-icons
                      * version - '5.15.4'

        ** Used for facebook Sharing,
           whatsapp sharing,
           email sharing,
           copy link.

        -- used in RepositoryComponent (app/AfterLogin/repository) - (URL : http://localhost:4200/#/Repository/files/21/202217)
        -- used in FormschecklistfilesComponent (app/AfterLogin/formschecklistfiles) - (URL : http://localhost:4200/#/formchecklist/files/13)
       -----------------------------------------------------------------------------------------------------------------
      * Chat Emoji - (DOCUMANTATION URL- https://www.npmjs.com/package/@ctrl/ngx-emoji-mart)

                    -- npm install @ctrl/ngx-emoji-mart
                       * version - '6.1.1'

        ** Used for Chat Emoji in Live Log Module.
       -----------------------------------------------------------------------------------------------------------------
      * Autocomplete input - (DOCUMENTATION URL - https://www.npmjs.com/package/angular-ng-autocomplete)

                     -- npm i angular-ng-autocomplete
                        * version - '2.0.5'

        ** Used for showing search item in the list after typing somethings in input.
                     -- used in RepositoryComponent (app/AfterLogin/repository) - (URL : http://localhost:4200/#/Repository/files/21/202217)
                     -- used in FormschecklistfilesComponent (app/AfterLogin/formschecklistfiles) - (URL : http://localhost:4200/#/formchecklist/files/13)
        -----------------------------------------------------------------------------------------------------------------
      * file-saver - (DOCUMENTATION URL - https://www.npmjs.com/package/file-saver)

                      -- npm i file-saver
                         * version - '2.0.5'
        ** Used for saving file (pdf,excel,word,ppt etc) in system.
                      -- used in RepositoryComponent (app/AfterLogin/repository) - (URL : http://localhost:4200/#/Repository/files/21/202217)
                      -- used in FormschecklistfilesComponent (app/AfterLogin/formschecklistfiles) - (URL : http://localhost:4200/#/formchecklist/files/13)

         -----------------------------------------------------------------------------------------------------------------
      * ngx-spinner - (DOCUMENTATION URL - https://www.npmjs.com/package/ngx-spinner)

                      -- npm i ngx-spinner
                          * version - '12.0.0'
        ** Used for showing loader on page load & after performing any action (i.e - Edit, delete, add)
                      -- used in all components in this project (admin & user).

         -----------------------------------------------------------------------------------------------------------------
      *  ngx-pagination - (DOCUMENTATION URL - https://www.npmjs.com/package/ngx-pagination)

                      -- npm i ngx-pagination
                          * version - '6.0.2'

        ** Used for showing pagination on list or table.

                       -- used in RepositoryComponent (app/AfterLogin/AddRepository/add-repository) - (URL : http://localhost:4200/#/addRepository)
                       -- used in FormschecklistfilesComponent (app/AfterLogin/forms-checklist) - (URL : http://localhost:4200/#/FormsCheckList)
         ------------------------------------------------------------------------------------------------------------------

      *  ng6-toastr-notifications - (DOCUMENTATION URL - https://www.npmjs.com/package/ng6-toastr-notifications)

                      -- npm i ng6-toastr-notifications
                          * version - '1.0.4'

          ** used in every operational page (Update , Add, Delete) & if there is any error from server (500, 404, 400).

          -----------------------------------------------------------------------------------------------------------------
      *   mat-table-exporter - (DOCUMENTATION URL - https://www.npmjs.com/package/mat-table-exporter)

                       -- npm i mat-table-exporter
                           * version - '10.2.4'

          ** used for downloading a material table data as excel in the system .

                       -- used in  ReportDataPooldetailsComponent (\app\Admin\AfterLogin\reportDataPool\report-data-pooldetails\report-data-pooldetails.component.ts)
           ----------------------------------------------------------------------------------------------------------------
      *   ng2-charts - (DOCUMENTATION URL - https://www.npmjs.com/package/ng2-charts)

                       -- npm i ng2-charts
                          * version - '3.0.8'

          ** used for showing charts (pie, line, bar)

                      -- used in AdminDashboardComponent (app\Admin\AfterLogin\admin-dashboard)-(URL - http://localhost:4200/#/admin/dashboard)
           -----------------------------------------------------------------------------------------------------------------
      *   ngx-doc-viewer - (DOCUMENTATION URL - https://www.npmjs.com/package/ngx-doc-viewer)

                      -- npm i ngx-doc-viewer
                          * version - '2.1.2'
          ** used for showing .docx,.doc,.pdf file in browser.

                        -- used in RepositoryComponent (app/AfterLogin/repository) - (URL : http://localhost:4200/#/Repository/files/21/202217)
                        -- used in FormschecklistfilesComponent (app/AfterLogin/formschecklistfiles) - (URL : http://localhost:4200/#/formchecklist/files/13)
                        -- used in UploaddashboardComponent (app\Admin\AfterLogin\FormsChecklist\Upload-Dashboard\uploaddashboard) - (URL - http://localhost:4200/#/UploadDashBoard)
          -----------------------------------------------------------------------------------------------------------------
      *   moment - (DOCUMENTATION URL - https://www.npmjs.com/package/moment)

                     -- npm i moment
                         * version - '2.29.4'
          ** used for calculating time b/n Start time and end time.

                       -- used in BoardComponent(src\app\AfterLogin\board\board.component.ts) - (URL - http://localhost:4200/#/Board)

                      ************************************               END             ****************************************


*/


import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './AfterLogin/weather/weather.component';

import { LoginLEEComponent } from './BeforeLogin/login-lee/login-lee.component';
import { BeforeLoginDashboardComponent } from './BeforeLogin/login-lee/before-login-dashboard/before-login-dashboard.component';
import { DashBoardComponent } from './AfterLogin/dash-board/dash-board.component';
import { HeaderComponent } from './AfterLogin/Common/header/header.component';
import { SidebarComponent } from './AfterLogin/Common/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivationModuleComponent } from './AfterLogin/activation-module/activation-module.component';
import { IncidentModuleComponent } from './AfterLogin/Incident/incident-module/incident-module.component';
import { AddIncidentComponent } from './AfterLogin/Incident/add-incident/add-incident.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
//For angular material Modules//
import {MatToolbarModule} from '@angular/material/toolbar'; // Used for Showing material toolbar (DOCUMENTATION URL - https://v12.material.angular.io/components/toolbar/overview)
import {MatDialogModule} from '@angular/material/dialog'; // Used for Showing material dialog box (DOCUMENTATION URL - https://v12.material.angular.io/components/dialog/overview)
import {MatProgressBarModule} from '@angular/material/progress-bar'; // Used for showing matrial progress bar (DOCUMENTATION URL - https://v12.material.angular.io/components/progress-bar/overview)
import {MatTabsModule} from '@angular/material/tabs'; // Used for showing matrial Tabs (DOCUMENTATION URL - https://v12.material.angular.io/components/tabs/overview)
import {MatTableModule} from '@angular/material/table'; // Used for showing matrial Data Table (DOCUMENTATION URL - https://v12.material.angular.io/components/table/overview)
import {MatPaginatorModule} from '@angular/material/paginator'; // Used for showing matrial Data Table pagination (DOCUMENTATION URL - https://v12.material.angular.io/components/paginator/overview)
import {MatSortModule} from '@angular/material/sort';  // Used for applying sorting on  matrial Data Table (DOCUMENTATION URL - https://v12.material.angular.io/components/sort/overview)
import {MatInputModule} from '@angular/material/input'; // Used for applying  matrial input (DOCUMENTATION URL - https://v12.material.angular.io/components/input/overview)
import {MatFormFieldModule} from '@angular/material/form-field'; // Used for applying additional styling like appearance- outline,fill etc on input field. (DOCUMENTATION URL - https://v12.material.angular.io/components/form-field/overview)
import {MatRadioModule} from '@angular/material/radio'; // Used for angular material radio button. (DOCUMENTATION URL - https://v12.material.angular.io/components/radio/overview)
import {MatCheckboxModule} from '@angular/material/checkbox'; // Used for angular material checkbox. (DOCUMENTATION URL - https://v12.material.angular.io/components/checkbox/overview)
import {MatButtonModule} from '@angular/material/button';// Used for angular material button. (DOCUMENTATION URL - https://v12.material.angular.io/components/button/overview)
import {MatIconModule} from '@angular/material/icon'; // Used for angular material icon. (DOCUMENTATION URL - https://v12.material.angular.io/components/icon/overview)
import {DragDropModule} from '@angular/cdk/drag-drop';// Used for angular material drag and drop facility in list. (DOCUMENTATION URL - https://material.angular.io/cdk/drag-drop/examples)
import {MatCardModule} from '@angular/material/card';// Used for angular material card. (DOCUMENTATION URL - https://v12.material.angular.io/components/card/overview)
import {MatTooltipModule} from '@angular/material/tooltip';// Used for angular material tooltip. (DOCUMENTATION URL - https://v12.material.angular.io/components/tooltip/overview)
import {MatGridListModule} from '@angular/material/grid-list';// Used for angular material grid list. (DOCUMENTATION URL - https://v12.material.angular.io/components/grid-list/overview)
import {MatMenuModule} from '@angular/material/menu';// Used for angular material menu . (DOCUMENTATION URL - https://v12.material.angular.io/components/menu/overview)
import {MatListModule} from '@angular/material/list'; // Used for angular material List . (DOCUMENTATION URL - https://v12.material.angular.io/components/list/overview)
import {MatSlideToggleModule} from '@angular/material/slide-toggle';  // Used for angular material slide Toggle . (DOCUMENTATION URL - https://v12.material.angular.io/components/slide-toggle/overview)
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Used for angular material progress spinner. (DOCUMENTATION URL - https://v12.material.angular.io/components/progress-spinner/overview)
import {MatBadgeModule} from '@angular/material/badge'; // Used for angular material badge. (DOCUMENTATION URL - https://v12.material.angular.io/components/badge/overview)
///END//////
import { EditIncidentComponent } from './AfterLogin/Incident/edit-incident/edit-incident.component';
import { LiveLogComponent } from './AfterLogin/live-log/live-log.component';
// import { BoardComponent } from './AfterLogin/board/board.component';

import { RepositoryComponent } from './AfterLogin/repository/repository.component';
import { FormsChecklistComponent } from './AfterLogin/forms-checklist/forms-checklist.component';
import { AudioVideoConferenceComponent } from './AfterLogin/audio-video-conference/audio-video-conference.component';
import { LogSheetComponent } from './AfterLogin/log-sheet/log-sheet.component';
// import { CallLoggerComponent } from './AfterLogin/call-logger/call-logger.component';
import { ReportDatepoolComponent } from './AfterLogin/report-datepool/report-datepool.component';
import { AdminsidebarComponent } from './Admin/Common/adminsidebar/adminsidebar.component';
import { AdminheaderComponent } from './Admin/Common/adminheader/adminheader.component';
import { AdminDashboardComponent } from './Admin/AfterLogin/admin-dashboard/admin-dashboard.component';
import { AdminOffshoreComponent } from './Admin/AfterLogin/admin-offshore/admin-offshore.component';
import { AddAdminOffshoreComponent } from './Admin/AfterLogin/add-admin-offshore/add-admin-offshore.component';
import { EditAdminOffshoreComponent } from './Admin/AfterLogin/edit-admin-offshore/edit-admin-offshore.component';
import { AdminIncidentComponent } from './Admin/AfterLogin/Admin-Incident/admin-incident/admin-incident.component';
import { AddAdminIncidentComponent } from './Admin/AfterLogin/Admin-Incident/add-admin-incident/add-admin-incident.component';
import { EditAdminIncidentComponent } from './Admin/AfterLogin/Admin-Incident/edit-admin-incident/edit-admin-incident.component';
import { AdminTierComponent } from './Admin/AfterLogin/Admin-Tier/admin-tier/admin-tier.component';
import { AddAdminTierComponent } from './Admin/AfterLogin/Admin-Tier/add-admin-tier/add-admin-tier.component';
import { EditAdminTierComponent } from './Admin/AfterLogin/Admin-Tier/edit-admin-tier/edit-admin-tier.component';
import { AdminPositionComponent } from './Admin/AfterLogin/Admin-Position/admin-position/admin-position.component';
import { AddAdminPositionComponent } from './Admin/AfterLogin/Admin-Position/add-admin-position/add-admin-position.component';
import { EditAdminPositionComponent } from './Admin/AfterLogin/Admin-Position/edit-admin-position/edit-admin-position.component';
import { AdminDepartmentComponent } from './Admin/AfterLogin/Admin-Department/admin-department/admin-department.component';
import { AddAdminDepartmentComponent } from './Admin/AfterLogin/Admin-Department/add-admin-department/add-admin-department.component';
import { EditAdminDepartmentComponent } from './Admin/AfterLogin/Admin-Department/edit-admin-department/edit-admin-department.component';
import { AdminEmployeeComponent } from './Admin/AfterLogin/Admin-Employee/admin-employee/admin-employee.component';
import { AddAdminEmployeeComponent } from './Admin/AfterLogin/Admin-Employee/add-admin-employee/add-admin-employee.component';
import { EditAdminEmployeeComponent } from './Admin/AfterLogin/Admin-Employee/edit-admin-employee/edit-admin-employee.component';
import { AdminTeamComponent } from './Admin/AfterLogin/Admin-team/admin-team/admin-team.component';
import { AddAdminTeamComponent } from './Admin/AfterLogin/Admin-team/add-admin-team/add-admin-team.component';
import { EditAdminTeamComponent } from './Admin/AfterLogin/Admin-team/edit-admin-team/edit-admin-team.component';
import { AssignTeamComponent } from './Admin/AfterLogin/Team/assign-team/assign-team.component';
import { AddTeamMemberComponent } from './Admin/AfterLogin/Team/add-team-member/add-team-member.component';
import { AddTeamStatusComponent } from './Admin/AfterLogin/Team/TeamStatus/add-team-status/add-team-status.component';
import { UserStatusComponent } from './Admin/AfterLogin/User-Status/user-status/user-status.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
//For Date Pipe////
import { DatePipe } from '@angular/common'; // Used for datePipe transformation (DOCUMENTATION URL - https://angular.io/api/common/DatePipe)
//For ngx Spinner //////
import { NgxSpinnerModule } from "ngx-spinner"; // Used for Spinner. (DOCUMENTATION URL - https://www.npmjs.com/package/ngx-spinner)
////END////////////////
////ng6-toaster-notification////
import { ToastrModule } from 'ng6-toastr-notifications'; // Used for Showing notification toaster. (DOCUMENTATION URL - https://www.npmjs.com/package/ng6-toastr-notifications)
import { AdminLoginComponent } from './Admin/BeforeLogin/admin-login/admin-login.component';
import { ForgetPasswordForAdminComponent } from './Admin/BeforeLogin/forget-password-for-admin/forget-password-for-admin.component';
import { EditDashbaordComponent } from './AfterLogin/Close-Incident/edit-dashbaord/edit-dashbaord.component';
import { ApproveIncidentComponent } from './AfterLogin/Incident/approve-incident/approve-incident.component';
///END////////////
/////Emoji Package//////////
import { PickerModule } from '@ctrl/ngx-emoji-mart'; // Used for chat emoji. (DOCUMENTATION URL - https://www.npmjs.com/package/@ctrl/ngx-emoji-mart)
//////End//////////////////
/////FOR KENDO UI//////////
import { UploadsComponent } from './Admin/AfterLogin/FormsChecklist/uploads/uploads.component';
import { CategoryComponent } from './Admin/AfterLogin/FormsChecklist/category/category.component';
import { CreateCategoryComponent } from './Admin/AfterLogin/FormsChecklist/create-category/create-category.component';
import { UploaddashboardComponent } from './Admin/AfterLogin/FormsChecklist/Upload-Dashboard/uploaddashboard/uploaddashboard.component';
import { FormschecklistfilesComponent } from './AfterLogin/formschecklistfiles/formschecklistfiles.component';
// import { FormschecklistfilesComponent } from './AfterLogin/formschecklistfiles/formschecklistfiles.component';
// import { SearchFilterPipe } from './search-filter.pipe';
/////END///////////////////
///Autocomplete/////
import {AutocompleteLibModule} from 'angular-ng-autocomplete'; // Used for showing autocompolete after a user input some data (DOCUMENTATION URL - https://www.npmjs.com/package/angular-ng-autocomplete)
///End/////////////
///Social Share////

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons'; // Used for showing social button for sharing (DOCUMENTATION  URL - https://ngx-sharebuttons.netlify.app/#/)
import { ShareIconsModule } from 'ngx-sharebuttons/icons'; // Used for showing social icon for sharing (DOCUMENTATION  URL - https://ngx-sharebuttons.netlify.app/#/)
import { CallLoggerComponent } from './AfterLogin/call-log/call-logger/call-logger.component';
import { AddCallLoggerComponent } from './AfterLogin/call-log/add-call-logger/add-call-logger.component';
import { CreateMeetingComponent } from './AfterLogin/audio-video-conference/create-meeting/create-meeting/create-meeting.component';
import { FirstloggedinchangePasswordComponent } from './AfterLogin/FirstTimeChangePassWord/firstloggedinchange-password/firstloggedinchange-password.component';
import { PreviewFileComponent } from './Admin/AfterLogin/PreviewFile/preview-file/preview-file.component';
///Ngx Doc Viewer ////////////////////////////////
import { NgxDocViewerModule } from 'ngx-doc-viewer'; // Used for showing .docs,.doc,.pdf on browser (DOCUMENTATION  URL -  https://www.npmjs.com/package/ngx-doc-viewer)
import { AddRepositoryComponent } from './AfterLogin/AddRepository/add-repository/add-repository.component';
import { RepoDashboardComponent } from './Admin/AfterLogin/Admin-Repository/repo-dashboard/repo-dashboard.component';
import { AddRepoComponent } from './Admin/AfterLogin/Admin-Repository/add-repo/add-repo.component';
import { ReportdatapoolDetailsComponent } from './AfterLogin/report-datepool/detailsReportdatapool/reportdatapool-details/reportdatapool-details.component';
//End////////////////////////////////////////////

import { MatTableExporterModule } from 'mat-table-exporter'; // used for downloading angular material table data as excel. (DOCUMENTATION URL - https://www.npmjs.com/package/mat-table-exporter)
import { ReportDataPooldashboardComponent } from './Admin/AfterLogin/reportDataPool/report-data-pooldashboard/report-data-pooldashboard.component';
import { ReportDataPooldetailsComponent } from './Admin/AfterLogin/reportDataPool/report-data-pooldetails/report-data-pooldetails.component';

///End////////////
// Chart ng2///
import { NgChartsModule } from 'ng2-charts'; // Used for showing charts. (DOCUMENTATION URL - https://www.npmjs.com/package/ng2-charts)
import { ResetPasswordComponent } from './Admin/BeforeLogin/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './BeforeLogin/login-lee/ForgetPassword/forgot-password/forgot-password.component';
import { UserInfoComponent } from './AfterLogin/user-info/user-info.component';
import { DialogalertComponent } from './CommonDialogAlert/dialogalert/dialogalert.component';
import { NotificationComponent } from './CommonDialogAlert/Notification/Notification.component';
import {MatExpansionModule} from '@angular/material/expansion'; // Used for material expansion panel. (DOCUMENTATION URL - https://v12.material.angular.io/components/expansion/examples)
// End////////
//Ngx Pagination//
import { NgxPaginationModule } from 'ngx-pagination'; // Used for showing pagination on list/Table (DOCUMENTATION URL - https://www.npmjs.com/package/ngx-pagination)
import { HandoverComponent } from './AfterLogin/handover/handover.component';
import { GlobalErrorHandlingInterceptor } from './Interceptor/global-error-handling.interceptor';
import { BoardComponent } from './AfterLogin/board/board.component';
import { HandOverDashboardComponent } from './AfterLogin/hand-over-dashboard/hand-over-dashboard.component';
import { LessonDashboardComponent } from './AfterLogin/Lesson_Learnt/lesson-dashboard/lesson-dashboard.component';
import { AddLessonLearntComponent } from './AfterLogin/Lesson_Learnt/add-lesson-learnt/add-lesson-learnt.component';
import { PageNotFoundComponent } from './Error_pages/page-not-found/page-not-found.component';
import { MediaComponent } from './AfterLogin/Media_Module/media/media.component';
import { ModifyMediaComponent } from './AfterLogin/Media_Module/modify-media/modify-media.component';
import { OilspillComponent } from './AfterLogin/oilspill/oilspill.component';
import { MeetingDashboardComponent } from './AfterLogin/weeklyMeeting/meeting-dashboard/meeting-dashboard.component';
import { ModifyMeetingComponent } from './AfterLogin/weeklyMeeting/modify-meeting/modify-meeting.component';
import { AGaurdGuard } from './Gaurds/a-gaurd.guard';
import { UGaurdGuard } from './Gaurds/u-gaurd.guard';
import { LoginGuard } from './Gaurds/login.guard';
import { AdminAuthGuard } from './Gaurds/admin-auth.guard';
import { CKEditorModule } from 'ng2-ckeditor';
import { InvestigationComponent } from './AfterLogin/IncInvestigationReport/investigation/investigation.component';
import { ModifyInvestigationComponent } from './AfterLogin/IncInvestigationReport/modify-investigation/modify-investigation.component';
//End//
@NgModule({
  //It is the container section of the NgModule where all the commponents that are created is going to be imported here.
  declarations: [
    WeatherComponent ,
    NotificationComponent,
    AppComponent,
    LoginLEEComponent,
    BeforeLoginDashboardComponent,
    DashBoardComponent,
    HeaderComponent,
    SidebarComponent,
    ActivationModuleComponent,
    IncidentModuleComponent,
    AddIncidentComponent,
    EditIncidentComponent,
    LiveLogComponent,
    BoardComponent,
    RepositoryComponent,
    FormsChecklistComponent,
    AudioVideoConferenceComponent,
    LogSheetComponent,
    CallLoggerComponent,
    ReportDatepoolComponent,
    AdminsidebarComponent,
    AdminheaderComponent,
    AdminDashboardComponent,
    AdminOffshoreComponent,
    AddAdminOffshoreComponent,
    EditAdminOffshoreComponent,
    AdminIncidentComponent,
    AddAdminIncidentComponent,
    EditAdminIncidentComponent,
    AdminTierComponent,
    AddAdminTierComponent,
    EditAdminTierComponent,
    AdminPositionComponent,
    AddAdminPositionComponent,
    EditAdminPositionComponent,
    AdminDepartmentComponent,
    AddAdminDepartmentComponent,
    EditAdminDepartmentComponent,
    AdminEmployeeComponent,
    AddAdminEmployeeComponent,
    EditAdminEmployeeComponent,
    AdminTeamComponent,
    AddAdminTeamComponent,
    EditAdminTeamComponent,
    AssignTeamComponent,
    AddTeamMemberComponent,
    AddTeamStatusComponent,
    UserStatusComponent,
    AdminLoginComponent,
    ForgetPasswordForAdminComponent,
    EditDashbaordComponent,
    ApproveIncidentComponent,
    UploadsComponent,
    CategoryComponent,
    CreateCategoryComponent,
    UploaddashboardComponent,
    FormschecklistfilesComponent,
    AddCallLoggerComponent,
    CreateMeetingComponent,
    FirstloggedinchangePasswordComponent,
    PreviewFileComponent,
    AddRepositoryComponent,
    RepoDashboardComponent,
    AddRepoComponent,
    ReportdatapoolDetailsComponent,
    ReportDataPooldashboardComponent,
    ReportDataPooldetailsComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    UserInfoComponent,
    DialogalertComponent,
    HandoverComponent,
    HandOverDashboardComponent,
    LessonDashboardComponent,
    AddLessonLearntComponent,
    PageNotFoundComponent,
    MediaComponent,
    ModifyMediaComponent,
    OilspillComponent,
    MeetingDashboardComponent,
    ModifyMeetingComponent,
    InvestigationComponent,
    ModifyInvestigationComponent
    // SearchFilterPipe
  ],
  //It is the container section of the NgModule where all the modules of packages that are installed is going to be imported here.
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatDialogModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    MatBadgeModule,
    MatProgressBarModule,
    NgChartsModule,
    MatTableExporterModule,
    NgxDocViewerModule,
    MatTabsModule,
    ShareIconsModule,
    AutocompleteLibModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    PickerModule,
    MatListModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    MatGridListModule,
    BrowserModule,
    NgxSpinnerModule,
    MatTooltipModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatCheckboxModule,
    MatTableModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    AngularMultiSelectModule,
    FormsModule,
    CKEditorModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CKEditorModule
  ],
 // A provider is an instruction to the Dependency Injection system on how to obtain a value for a dependency.
  providers: [DatePipe, // It is used for transforming datetime in the desire format.e.x-(dd-MM-YYYYTHH:mm) -> (YYYY-MM-dd HH:mm)
    {provide:HTTP_INTERCEPTORS,useClass:GlobalErrorHandlingInterceptor,multi:true}, // It is used for handling global error from server
    {provide:LocationStrategy, useClass:HashLocationStrategy}, // It is used for injecting hash in the route url.
    UGaurdGuard,AGaurdGuard,LoginGuard,AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
