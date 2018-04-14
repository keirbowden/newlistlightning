({
    init : function(component, event, helper) {
        var accounts=[];
        for (var idx=0; idx<5; idx++) {
            accounts.push({sobjectType:'Account'});
        }
        component.set('v.accounts', accounts);
    },
    deleteRow : function(component, event, helper) {
        var name=event.getSource().get("v.name");
        var index=name.substring(3);
        var accounts=component.get('v.accounts');
        accounts.splice(index, 1);
        component.set('v.accounts', accounts);
    },
    addRow : function(component, event, helper) {
        var accounts=component.get('v.accounts');
        accounts.push({sobjectType:'Account'});
        component.set('v.accounts', accounts);
    },
    saveRows : function(component, event, helper) {
        var accounts=component.get('v.accounts');
        var toSave=[];
        for (var idx=0; idx<accounts.length; idx++) {
            if ( (null!=accounts[idx].Name) && (''!=accounts[idx].Name) ) {
                toSave.push(accounts[idx]);
            }
        }
        var accAction = component.get("c.SaveAccounts");
        var params={"accountsStr":JSON.stringify(toSave)};
        accAction.setParams(params);
        accAction.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
		        var toastEvent=$A.get("e.force:showToast");
        		if (toastEvent) {
		            toastEvent.setParams({
        		        "type":'success',
                		"title":'Success',
                        "message":'Accounts saved'
		            });
        
    		        toastEvent.fire();
                }    
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        reject(Error("Error message: " + errors[0].message));
                    }
                }
                else {
                    reject(Error("Unknown error"));
                }
            }
        });
        $A.enqueueAction(accAction);           
    }
})