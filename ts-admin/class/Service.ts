//const API_URL = 'http://localhost/jpmc-php/webservice_tp/api/';
const API_URL = 'http://localhost/webservice_tp/api/';

export class Service
{
    formatDateToSQL(date: string,time: string): string
    {
        return date + 'T' + time + ':00';
    }
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
    createEvent(data:{ label: string,date_start: string,date_end: string,position: string,id_category: number },callback: JQuery.Ajax.SuccessCallback<{ success: boolean, id: number,message: string}>): void
    {
        $.ajax({
            url: API_URL + 'event/',
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
    updateEvent(id: number,data:{ label: string,date_start: string,date_end: string,position: string,id_category: number },callback: JQuery.Ajax.SuccessCallback<{ success: boolean, id: number,message: string}>): void
    {
        $.ajax({
            url: API_URL + 'event/' + id,
            method: "PUT",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: callback,
            error: function(err){
                console.log('ERREUR');
                console.log(err);
            }
        });
    }
    deleteEvent(id: number,callback: JQuery.Ajax.SuccessCallback<{ success: boolean}>): void
    {
        $.ajax({
            url: API_URL + 'event/'+ id,
            method: "DELETE",
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
}