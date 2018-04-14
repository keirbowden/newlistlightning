public class BulkAccountController 
{
	@AuraEnabled
    public static void SaveAccounts(String accountsStr)
    {
		Account[] accounts=(Account[]) JSON.deserialize(accountsStr, Account[].class);
        insert accounts;
    }
}