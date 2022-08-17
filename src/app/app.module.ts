import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
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
import { DatePipe } from '@angular/common';
//For ngx Spinner //////
import { NgxSpinnerModule } from "ngx-spinner";
////END////////////////
////ng6-toaster-notification////
import { ToastrModule } from 'ng6-toastr-notifications';
import { AdminLoginComponent } from './Admin/BeforeLogin/admin-login/admin-login.component';
import { ForgetPasswordForAdminComponent } from './Admin/BeforeLogin/forget-password-for-admin/forget-password-for-admin.component';
import { EditDashbaordComponent } from './AfterLogin/Close-Incident/edit-dashbaord/edit-dashbaord.component';
import { ApproveIncidentComponent } from './AfterLogin/Incident/approve-incident/approve-incident.component';
///END////////////
/////Emoji Package//////////
import { PickerModule } from '@ctrl/ngx-emoji-mart';
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
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
///End/////////////
///Social Share////

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { CallLoggerComponent } from './AfterLogin/call-log/call-logger/call-logger.component';
import { AddCallLoggerComponent } from './AfterLogin/call-log/add-call-logger/add-call-logger.component';
import { CreateMeetingComponent } from './AfterLogin/audio-video-conference/create-meeting/create-meeting/create-meeting.component';
import { AddlogsheetComponent } from './AfterLogin/log-sheet/Add-Log-Sheet/addlogsheet/addlogsheet.component';
import { EditLogSheetComponent } from './AfterLogin/log-sheet/Edit-Log-Sheet/edit-log-sheet/edit-log-sheet.component';
import { FirstloggedinchangePasswordComponent } from './AfterLogin/FirstTimeChangePassWord/firstloggedinchange-password/firstloggedinchange-password.component';
import { PreviewFileComponent } from './Admin/AfterLogin/PreviewFile/preview-file/preview-file.component';
///Ngx Doc Viewer ////////////////////////////////
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { AddRepositoryComponent } from './AfterLogin/AddRepository/add-repository/add-repository.component';
import { RepoDashboardComponent } from './Admin/AfterLogin/Admin-Repository/repo-dashboard/repo-dashboard.component';
import { AddRepoComponent } from './Admin/AfterLogin/Admin-Repository/add-repo/add-repo.component';
import { ReportdatapoolDetailsComponent } from './AfterLogin/report-datepool/detailsReportdatapool/reportdatapool-details/reportdatapool-details.component';
//End////////////////////////////////////////////

import { MatTableExporterModule } from 'mat-table-exporter';
import { ReportDataPooldashboardComponent } from './Admin/AfterLogin/reportDataPool/report-data-pooldashboard/report-data-pooldashboard.component';
import { ReportDataPooldetailsComponent } from './Admin/AfterLogin/reportDataPool/report-data-pooldetails/report-data-pooldetails.component';

///End////////////
// Chart ng2///
import { NgChartsModule } from 'ng2-charts';
import { ResetPasswordComponent } from './Admin/BeforeLogin/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './BeforeLogin/login-lee/ForgetPassword/forgot-password/forgot-password.component';
import { UserInfoComponent } from './AfterLogin/user-info/user-info.component';
import { DialogalertComponent } from './CommonDialogAlert/dialogalert/dialogalert.component';
import { NotificationComponent } from './CommonDialogAlert/Notification/Notification.component';
import {MatExpansionModule} from '@angular/material/expansion';
// End////////
//Ngx Pagination//
import { NgxPaginationModule } from 'ngx-pagination';
import { HandoverComponent } from './AfterLogin/handover/handover.component';
import { GlobalErrorHandlingInterceptor } from './Interceptor/global-error-handling.interceptor';
import { BoardComponent } from './AfterLogin/board/board.component';
import { HandOverDashboardComponent } from './AfterLogin/hand-over-dashboard/hand-over-dashboard.component';
import { LessonDashboardComponent } from './AfterLogin/Lesson_Learnt/lesson-dashboard/lesson-dashboard.component';
import { AddLessonLearntComponent } from './AfterLogin/Lesson_Learnt/add-lesson-learnt/add-lesson-learnt.component';
import { PageNotFoundComponent } from './Error_pages/page-not-found/page-not-found.component';
import { MediaComponent } from './AfterLogin/Media_Module/media/media.component';
import { ModifyMediaComponent } from './AfterLogin/Media_Module/modify-media/modify-media.component';
//End//
@NgModule({
  declarations: [
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
    AddlogsheetComponent,
    EditLogSheetComponent,
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
    ModifyMediaComponent
    // SearchFilterPipe
  ],
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
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe,
    {provide:HTTP_INTERCEPTORS,useClass:GlobalErrorHandlingInterceptor,multi:true},
    {provide:LocationStrategy, useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
