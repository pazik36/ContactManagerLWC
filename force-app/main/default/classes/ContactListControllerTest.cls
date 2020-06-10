@isTest

public class ContactListControllerTest {

     @isTest static void testMethod1 (){
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
	   // call the method getConlist()
	   List<Contact> getConList = ContactListController.getConlist();
        //check count contacts 
       Integer i = [SELECT COUNT() FROM Contact];
       System.assertEquals(3, i);
       // call the method deleteContactById()
       List<Contact> delCon = ContactListController.deleteContactById(con1.Id);
       //check count contacts 
       Integer j = [SELECT COUNT() FROM Contact];
       System.assertEquals(2, j);
	   // call the method searchContact()
       List<Contact> searchCon = ContactListController.searchContact('t');  
	   //check count contacts, name begin 't' 
       System.assertEquals(2, searchCon.size());
   
     }
   	   
      @isTest static void saveDetailsTest(){
         //Create contact
          Contact con = new Contact (FirstName = 'test1', LastName = 'test1', Email = 'test1@test1.com');
         // call the method saveDetails()
          ContactListController.saveDetails(con);
          List<Contact> contactList = [SELECT Id FROM Contact];
          //check count contacts
          System.assertEquals(1, contactList.size());
          
      }
    
          @isTest static void fetchLookUpValues(){
             //Create list of Accounts
             List<Account> accList = new List<Account>();
             //Create account
             Account accnt1 = new Account( Name='TestAccount');
             Account accnt2 = new Account( Name='AccountTest');  
             accList.add(accnt1);
             accList.add(accnt2);
             //insert account list
             insert accList;
             // call the method fetchLookUpValues()
             List<Account> searchAcc = ContactListController.fetchLookUpValues('A');
         	 //check count contacts, name begin 'A'
             System.assertEquals(1, searchAcc.size());
          
          }   
 
      
    }