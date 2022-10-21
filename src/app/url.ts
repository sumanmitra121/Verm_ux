export class global_url_test{
  // static URL="http://192.168.1.244:3000/";
  // static project_URL="http://localhost:4200/#/Conference";

  // static URL="https://vermapi.opentech4u.co.in/";
  // static project_URL="https://verm.opentech4u.co.in/#/Conference";

   static URL="https://api.er-360.com/";
   static project_URL="https://er-360.com/#/Conference";
   //For Create Update closed & approved incident
  static  get_dt(id:any,mode:any,name:any,type:any,user:any,action_type:any,date:any,_inc_no?:any){
     var dt=action_type=='IC' ? {id:'0',activity:mode,narration:"An incident,"+name+' of ' + type+' is created by '+localStorage.getItem('Emp_name')+' at '+date,view_flag:'N',created_by:localStorage.getItem('Employee_id'),inc_no:_inc_no}
     :(action_type=='IU' ? {id:'0',activity:mode,narration:"An incident,"+name+' of ' + type+' is updated by '+localStorage.getItem('Emp_name')+' at '+date,view_flag:'N',created_by:localStorage.getItem('Employee_id'),inc_no:localStorage.getItem('Inc_No')}
     :(action_type=='ICL' ? {id:'0',activity:mode,narration:"An incident,"+name+' of ' + type+' is closed by '+localStorage.getItem('Emp_name')+' at '+date,view_flag:'N',created_by:localStorage.getItem('Employee_id'),inc_no:localStorage.getItem('Inc_No')}
     :{id:'0',activity:mode,narration:"An incident,"+name+' of ' + type+' is archived by '+localStorage.getItem('Emp_name')+' at '+date,view_flag:'N',created_by:localStorage.getItem('Employee_id'),inc_no:localStorage.getItem('Inc_No')}));
     return dt;
    }

    // For repository status
    static getrepository(user:any,file_name:any,date:any){
      var dt={id:'0',activity:'R',narration: localStorage.getItem('Emp_name')+' has uploaded '+file_name+' at'+date,view_flag:'N',created_by:localStorage.getItem('Employee_id'),inc_no:localStorage.getItem('Inc_No')};
      return dt;
    }
    // For Board Status
    static getboardStatus(user:any,status_type:any,mode:any,date:any){
      var dt={id:'0',activity:status_type,narration:localStorage.getItem('Emp_name')+' has '+mode+' at '+date,view_flag:'N',created_by:localStorage.getItem('Employee_id'),inc_no:localStorage.getItem('Inc_No')};
      return dt;
    }

    // For Opening File
    static ClickToOpenFile(url:any){
      window.open(url, '_blank');
    }

  }
