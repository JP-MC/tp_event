//const API_URL = 'http://localhost/jpmc-php/webservice_tp/api/';
const API_URL = 'http://localhost/webservice_tp/api/';

export class Service
{
    getEvents(callback: JQuery.Ajax.SuccessCallback<{ success: boolean, event_list: Array<{ id: number,label: string,date_start: string,date_end: string,position: string,id_category: number }> }>)
    {
        $.ajax({
            url: API_URL + 'event/',
            method: "GET",
            dataType: "json",
            success: callback,
            error: function(err){
                console.log('ERREUR');
                console.log(err);
            }
        });
    }

    getCategories(callback: JQuery.Ajax.SuccessCallback<{ success: boolean, category_list: Array<{ id: number,label: string }> }>)
    {
        $.ajax({
            url: API_URL + 'category/',
            method: "GET",
            dataType: "json",
            success: callback,
            error: function(err){
                console.log('ERREUR');
                console.log(err);
            }
        });
    }

    userLogin(data:{ login: string,pass: string },callback: JQuery.Ajax.SuccessCallback<{ success: boolean, id: number}>)
    {
        $.ajax({
            url: API_URL + 'userlogin/',
            method: "POST",
            dataType: "json",
            data: data,
            success: callback,
            error: function(err){
                console.log('ERREUR');
                console.log(err);
            }
        });
    }

    userLogout(id:number,callback: JQuery.Ajax.SuccessCallback<{ success: boolean}>)
    {
        $.ajax({
            url: API_URL + 'userlogout/' + id,
            method: "GET",
            dataType: "json",
            success: callback,
            error: function(err){
                console.log('ERREUR');
                console.log(err);
            }
        });
    }

    isLogged(id:number,callback: JQuery.Ajax.SuccessCallback<{ success: boolean}>)
    {
        $.ajax({
            url: API_URL + 'islogged/' + id,
            method: "GET",
            dataType: "json",
            success: callback,
            error: function(err){
                console.log('ERREUR');
                console.log(err);
            }
        });
    }
}