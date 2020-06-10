({	
     delete : function(component, event, helper) {        
        if(confirm('Are you sure?'))
    //call helper function	
        helper.deleteContact(component, event);        
    },
 
 	 //open modal mindow
    newPopup : function(component, event, helper){
        var cmpTarget = component.find('Modalbox1');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open');
	},
        //Save button of modal window
        saveModal : function(component, event, helper){
        var regForm = component.get("v.conForm");

        //set the default accountId is null 
          regForm.AccountId = null ; 
       // check if selectedLookupRecord is not equal to undefined then set the accountId from 
       // selected Lookup Object to Contact Object before passing this to Server side method
        if(component.get("v.selectedLookUpRecord").Id != undefined){
          regForm.AccountId = component.get("v.selectedLookUpRecord").Id;
        }
        var action = component.get("c.saveDetails");
        action.setParams({regForm1  : regForm});
        action.setCallback(this, function(response) {
            var state = response.getState();          
            if (state === "SUCCESS") {
                
                $A.get('e.force:refreshView').fire();
                var cmpTarget = component.find('Modalbox1');
                var cmpBack = component.find('Modalbackdrop');
                $A.util.removeClass(cmpBack,'slds-backdrop--open');
                $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
                
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } 
                else {
                    console.log(response.getReturnValue());
                }
            }
        });
        $A.enqueueAction(action);
    },
        
       
    
    closeNewModal : function(component, event, helper){
        var cmpTarget = component.find('Modalbox1');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
    },
 	
    Search: function(component, event, helper) {
        var searchField = component.find('searchField');
        var isValueMissing = searchField.get('v.validity').valueMissing;
        // if value is missing show error message and focus on field
        if(isValueMissing) {
            searchField.showHelpMessageIfInvalid();
            searchField.focus();
        }else{
          // else call helper function 
            helper.SearchHelper(component, event);
        }
    },
	
    doInit:function(component,event,helper){
         //  call helper function 
        helper.getContacts(component);
    },
     // pagination, last, next, previous   
    next:function(component,event,helper){
     //  call helper function 
        helper.next(component);
    },
        
    previous:function(component,event,helper){
     //  call helper function 
        helper.previous(component);
    },
        
     First:function(component,event,helper){
    //  call helper function
    	helper.First(component);
    },
        
    Last:function(component,event,helper){
    //  call helper function
    helper.Last(component);
    },
    
    onSelectChange: function(component, event, helper) {
        component.set("v.pageSize",component.find("recordSize").get("v.value"));
     //  call helper function
        helper.paginate(component);
    },
     
    // sorting   
    sortByName: function(component, event, helper) {
        helper.sortBy(component,helper, "Name"); 
        var a=component.get("v.sortAsc");
        component.set("v.Name",a);
    },
    sortBycontactlevel: function(component, event, helper) {
        helper.sortBy(component,helper, "contactlevel");
        var a=component.get("v.sortAsc");
        component.set("v.contactlevel",a);
    },
    sortByEmail: function(component, event, helper) {
        helper.sortBy(component,helper, "Email");
         var a=component.get("v.sortAsc");
        component.set("v.email",a);
    },
    sortByOwner: function(component, event, helper) {
        helper.sortBy(component,helper, "owner");
         var a=component.get("v.sortAsc");
        component.set("v.owner",a);
    },
    sortByAccountName: function(component, event, helper) {
        helper.sortBy(component,helper, "AccountName");
         var a=component.get("v.sortAsc");
        component.set("v.accountName",a);
    },
    sortByCreatedBy: function(component, event, helper) {
        helper.sortBy(component,helper, "CreatedBy");
         var a=component.get("v.sortAsc");
        component.set("v.CreatedBy",a);
    },
    sortByCreatedDate: function(component, event, helper) {
        helper.sortBy(component,helper, "CreatedDate");
         var a=component.get("v.sortAsc");
        component.set("v.CreatedDate",a);
    },
 
    // click link deteai view
    doView: function(component, event, helper) {
        var editRecordEvent = $A.get("e.force:navigateToSObject");
        editRecordEvent.setParams({
            "recordId": event.target.id
        });
        editRecordEvent.fire();
    },
    
        doEdit: function(component, event, helper) {
        var recordId = event.getParam("recordId");
        window.location.href = '/one/one.app#/sObject/'+recordId+'/view';
 
    }
})