@isTest

public class ContactTriggerTest {
     
    @isTest public static void CotnactTriggerTest(){
    	//Create account
       Account accnt = new Account( Name='TestAccount');
       insert accnt; 
       //Create list of contacts
       List<Contact> conlist = new List<Contact>();
       Contact con1 = new Contact(FirstName = 'test1', LastName = 'test1', Email = 'test1@test1.com',
								 Contact_Level__c = 'Primary', AccountId = accnt.Id);
       Contact con2 = new Contact(FirstName = 'test2', LastName = 'test2', Email = 'test2@test2.com',
								 Contact_Level__c = 'Secondary', AccountId = accnt.Id);
       Contact con3 = new Contact(FirstName = 'test3', LastName = 'test3', Email = 'test3@test3.com',
								 Contact_Level__c = 'Tertiary', AccountId = accnt.Id);
 
	   conlist.add(con1);
       conlist.add(con2);
       conlist.add(con3);
	   //insert contact list 
       insert conlist;
	   
       List <Case> cases = [SELECT Id, Owner.Name, Status, Origin, Priority, ContactId, AccountId FROM Case ];
  	   //check count cases
       Integer i = [SELECT COUNT() FROM Case];
       System.assert(true, cases!=null);
       System.assertEquals(3, i);       
       
       
       Case case0 = cases.get(0);
       Case case1 = cases.get(1);
       Case case2 = cases.get(2);
	  //check the appropriate field Prority	
       System.assert(case0.Priority == 'High');
       System.assert(case1.Priority == 'Medium');
       System.assert(case2.Priority == 'Low');
      //check the appropriate field AccountId 
       System.assert(case0.AccountId == accnt.Id);
       System.assert(case1.AccountId == accnt.Id);
       System.assert(case2.AccountId == accnt.Id); 
        
       //check the appropriate field ContactId	
       System.assert(case0.ContactId == con1.Id);
       System.assert(case1.ContactId == con2.Id);
       System.assert(case2.ContactId == con3.Id);
        
       //check the appropriate field Owner	
       System.assert(case0.Owner.Name == accnt.Owner.Name);
       System.assert(case1.Owner.Name== accnt.Owner.Name);
       System.assert(case2.Owner.Name == accnt.Owner.Name);
        
      //check the appropriate field Status	
       System.assert(case0.Status == 'Working');
       System.assert(case1.Status == 'Working');
       System.assert(case2.Status == 'Working');
      //check the appropriate field Origin	
       System.assert(case0.Origin == 'New Contact');
       System.assert(case1.Origin == 'New Contact');
       System.assert(case2.Origin == 'New Contact');
       //del one of contacts 
       Contact delcon = [SELECT Id, LastName FROM Contact WHERE LastName = 'test1'];
       delete delcon;
	
       List <Case> casesList = [SELECT Id, OwnerID, Status, Origin, Priority, ContactId, AccountId FROM Case ];
  	   //check count cases
       Integer j = [SELECT COUNT() FROM Case];
       System.assert(true, cases!=null);
       System.assertEquals(2, j);
       //check the absence of a field Priority (High)
       System.assert(case1.Priority == 'Medium');
       System.assert(case2.Priority == 'Low');
       
      
        }
}