public with sharing class ContactListController {
	
    // to retrieve all contacts
     @AuraEnabled
    public static List<Contact> getConlist() {
         return [SELECT Id, Name, Email, Contact_Level__c,
                 Account.Name, Owner.Name, CreatedBy.Name, CreatedDate 
                 FROM Contact
                 LIMIT 50 ];
     }

    // to delete contact
     @Auraenabled
    public static List<Contact> deleteContactById(String conid)
    {
        System.debug('In controller delteContactById method..');
        Contact delContact=[Select Id from Contact WHERE Id=:conid];
        delete delContact;
        return [SELECT Id, Name, Email, Contact_Level__c,
                Account.Name, Owner.Name, CreatedBy.Name, CreatedDate 
                FROM Contact
                LIMIT 50];
    }
  
     //to search contacts by name
     @AuraEnabled
 	public static List <Contact> searchContact(String searchKeyWord) {
  		String searchKey = searchKeyWord + '%';

 		return [SELECT Id, Name, Email, Contact_Level__c,
                Account.Name, Owner.Name, CreatedBy.Name, CreatedDate
                FROM Contact
                WHERE Name LIKE: searchKey LIMIT 50];
     }

    // insert new Contact
     @AuraEnabled
    public static void saveDetails (Contact regForm1){ 
  
        insert regForm1;
    }
    
    // to search Account by name for create new contact
     @AuraEnabled
    public static List <Account> fetchLookUpValues(String searchKeyWord) {
        
        String searchKey = searchKeyWord + '%';
	    return [SELECT Id, Name FROM Account WHERE Name LIKE: searchKey order by createdDate DESC limit 5];
  
    }
   
   }