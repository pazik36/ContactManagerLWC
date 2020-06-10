trigger ContactTrigger on Contact (after insert, before delete) {

    if(Trigger.isInsert) {
      
        List<Case> caseList = new List<Case>();
        
        for(Contact con : Trigger.New){
            Case newCase = new Case();
            newCase.AccountId = con.AccountId != null ? con.AccountId : null;
           
            if (con.Contact_Level__c == 'Primary'){
           	    newCase.Priority = 'High';
            }else if (con.Contact_Level__c == 'Secondary') {
				newCase.Priority = 'Medium';
        	}else {
				newCase.Priority = 'Low';
        
    	}
  			newCase.Status = 'Working';
        	newCase.Origin = 'New Contact';
        	newCase.ContactId = con.Id;
        
            if (newCase.AccountId != null){
            List<Account> accList = new List<Account>([SELECT Id, OwnerId FROM Account WHERE Id = :newCase.AccountId]);
            newCase.OwnerId = accList[0].OwnerId;
        }
        	CaseList.add(newCase);
        
        }
        	insert CaseList;
      
   }
			else if (Trigger.isDelete) {
 
					Set<Id> ConIDs = Trigger.oldMap.keyset();
		
						delete [SELECT Id FROM Case WHERE ContactId IN:ConIDs];

			} 
}