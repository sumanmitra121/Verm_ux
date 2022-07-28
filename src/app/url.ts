export class global_url_test{
  // static URL="http://192.168.1.244:3000/";
  // static project_URL="http://localhost:4200/#/Conference"
  static URL="https://vermapi.opentech4u.co.in/";
  static project_URL="https://verm.opentech4u.co.in/#/Conference";
   //For Create Update closed & approved incident
  static  get_dt(id:any,mode:any,name:any,type:any,user:any,action_type:any,date:any){
     var dt=action_type=='IC' ? {id:'0',activity:mode,narration:"An incident,"+name+' of ' + type+' is created by '+user+' at '+date,view_flag:'N',created_by:localStorage.getItem('Employee_id')}
     :(action_type=='IU' ? {id:'0',activity:mode,narration:"An incident,"+name+' of ' + type+' is updated by '+user+' at '+date,view_flag:'N',created_by:localStorage.getItem('Employee_id')}
     :(action_type=='ICL' ? {id:'0',activity:mode,narration:"An incident,"+name+' of ' + type+' is closed by '+user+' at '+date,view_flag:'N',created_by:localStorage.getItem('Employee_id')}
     :{id:'0',activity:mode,narration:"An incident,"+name+' of ' + type+' is approved by '+user+' at '+date,view_flag:'N',created_by:localStorage.getItem('Employee_id')}));
     return dt;
    }

    // For repository status
    static getrepository(user:any,file_name:any,date:any){
      var dt={id:'0',activity:'R',narration: user+' has uploaded '+file_name+' at'+date,view_flag:'N',created_by:localStorage.getItem('Employee_id')};
      return dt;
    }
    // For Board Status
    static getboardStatus(user:any,status_type:any,mode:any,date:any){
      var dt={id:'0',activity:status_type,narration:user+' has '+mode+' at '+date,view_flag:'N',created_by:localStorage.getItem('Employee_id')};
      return dt;
    }

  }
