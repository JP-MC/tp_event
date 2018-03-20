//compiler avec le fichier tsconfig.json : tsc --project tsconfig-admin.json

/* TODO */
// Utiliser google-maps pour localiser les festivals
// Bouton reset sur le formulaire pour annuler la modification d'un event

import $ from "jquery";
import { app } from "./class/App";

console.log( "Version: " + $.fn.jquery );
app.loadFromAPI();

app.$event_form.submit(function(event: JQuery.Event<HTMLFormElement>){
    console.log('submit');
    event.preventDefault();
    app.submitEvent();
});

app.$event_list.on('click','.delete',function(){
    console.log('delete');
    const id_event: number = parseInt( $(this).parent().parent().data('id') );
    app.removeEvent(id_event);
});

app.$event_list.on('click','.edit',function(){
    console.log('edit');
    const id_event: number = parseInt( $(this).parent().parent().data('id') );
    app.editEvent(id_event);
});