({
    deleteContact : function(component, event) {
        console.log('in delete contact helper method.');
        var action = component.get("c.deleteContactById");
        action.setParams({conid:event.target.id});
        action.setCallback(this, function(response) {
        	component.set("v.Contactlist",response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    //search contact
    SearchHelper: function(component, event) {
        // show spinner message
         component.find("Id_spinner").set("v.class" , 'slds-show');
        var action = component.get("c.searchContact");
        action.setParams({
            'searchKeyWord': component.get("v.searchKeyword")
        });
        action.setCallback(this, function(response) {
           // hide spinner when response coming from server 
            component.find("Id_spinner").set("v.class" , 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                
                // if storeResponse size is 0 ,display no record found message on screen.
                if (storeResponse.length == 0) {
                    component.set("v.Message", true);
                } else {
                    component.set("v.Message", false);
                }
                
                // set numberOfRecord attribute value with length of return value from server
                component.set("v.TotalNumberOfRecord", storeResponse.length);
                
                // set searchResult list with return value from server.
                component.set("v.Contactlist", storeResponse); 
                
            }else if (state === "INCOMPLETE") {
                alert('Response is Incompleted');
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    alert("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    
    },
    
    paginate : function(component) {
        var clist = component.get("v.MasterContactlist");
        component.set("v.Contactlist", clist);
        if(clist.length > component.get("v.pageSize")){
            var subContactlist = [];
            for(var i=0; i<component.get("v.pageSize"); i++){
                subContactlist.push(clist[i]);
            }
            component.set("v.Contactlist", subContactlist);
        }
    },
    // get contact list
    getContacts : function(component) {
        var action = component.get("c.getConlist");
        action.setParams({
        });
        action.setCallback(this, function(resp) {
            var state=resp.getState();
            if(state === "SUCCESS"){
                console.log(resp.getReturnValue());
                component.set("v.MasterContactlist", resp.getReturnValue());
                component.set("v.masterlistSize", component.get("v.MasterContactlist").length);
                component.set("v.startPosn",0);
                component.set("v.endPosn",component.get("v.pageSize")-1);
                this.paginate(component);
            }
        });
        $A.enqueueAction(action);
    },
    
    next : function(component) {
        var clist = component.get("v.MasterContactlist");
        var endPosn = component.get("v.endPosn");
        var startPosn = component.get("v.startPosn");
        var subContactlist = [];
        for(var i=0; i<component.get("v.pageSize"); i++){
            endPosn++;
            if(clist.length >= endPosn){
                subContactlist.push(clist[endPosn]);
            }
            startPosn++;
        }
        component.set("v.Contactlist",subContactlist);
        component.set("v.startPosn",startPosn);
        component.set("v.endPosn",endPosn);
    },
    previous : function(component) {
        var clist = component.get("v.MasterContactlist");
        var startPosn = component.get("v.startPosn");
        var endPosn = component.get("v.endPosn");
        var subContactlist = [];
        var pageSize = component.get("v.pageSize");
        startPosn -= pageSize;
        if(startPosn > -1){
            for(var i=0; i<pageSize; i++){
                if(startPosn > -1){
                    subContactlist.push(clist[startPosn]);
                    startPosn++;
                    endPosn--;
                }
            }
            startPosn -= pageSize;
            component.set("v.pContactlist",subContactlist);
            component.set("v.startPosn",startPosn);
            component.set("v.endPosn",endPosn);
        }
    },
    First : function(component) {
        var clist = component.get("v.MasterContactlist");
        var startPosn = component.get("v.startPosn");
        var endPosn = component.get("v.endPosn");
        var subContactlist = [];
        var pageSize = component.get("v.pageSize");
        startPosn=0;
        if(startPosn > -1){
            for(var i=0; i<pageSize; i++){
                if(startPosn > -1){
                    subContactlist.push(clist[startPosn]);
                    startPosn++;
                }
            }
            startPosn=0;
            endPosn=pageSize-1;
            component.set("v.Contactlist",subContactlist);
            component.set("v.startPosn",startPosn);
            component.set("v.endPosn",endPosn);
        }
    },
    Last : function(component) {
        var clist = component.get("v.MasterContactlist");
        var startPosn = component.get("v.startPosn");
        var endPosn = component.get("v.endPosn");
        var subContactlist = [];
        var pageSize = component.get("v.pageSize");
        var l=clist.length;
        var po=l-(l%pageSize);
        if((l%pageSize)!=0){
            startPosn=po;
        }
        else{
            startPosn=po-pageSize;
        }
        endPosn=l-1;
        if(startPosn <=endPosn ){
            for(var i=startPosn; i<=endPosn; i++){
                
                subContactlist.push(clist[i]);
            }
            component.set("v.Contactlist",subContactlist);
            component.set("v.startPosn",startPosn);
            component.set("v.endPosn",endPosn);
        }
    },
    
    sortBy: function(component,helper,field) {
        var sortAsc = component.get("v.sortAsc"),
            sortField = component.get("v.sortField"),
            records = component.get("v.MasterContactlist");
        sortAsc = field == sortField? !sortAsc: true;
        records.sort(function(a,b){
            var t1 = a[field] == b[field],
                t2 = (!a[field] && b[field]) || (a[field] < b[field]);
            return t1? 0: (sortAsc?-1:1)*(t2?1:-1);
        });
        component.set("v.sortAsc", sortAsc);
        component.set("v.sortField", field);
        component.set("v.MasterContactlist", records);
        var startPosn = component.get("v.startPosn");
        var endPosn = component.get("v.endPosn");
        var pageSize = component.get("v.pageSize");
        startPosn=0;
        endPosn=pageSize-1;
        component.set("v.startPosn", startPosn);
        component.set("v.endPosn", endPosn);
        helper.paginate(component);
    }
    
})