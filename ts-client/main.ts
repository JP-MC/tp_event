//compiler avec le fichier tsconfig.json : tsc --project tsconfig-client.json

/* TODO */
// Finir le Login des users
// Inscription des users
// L’utilisateur peut “Participer à un Festival” et “Ne plus Participer” take part / leave
// Utiliser google-maps pour localiser les festivals

import $ from "jquery";
import { app } from "./class/App";

//console.log( "Version: " + $.fn.jquery );
app.loadFromAPI();

app.$login_form.submit(function(event: JQuery.Event<HTMLFormElement>){
    console.log('submit');
    event.preventDefault();
    app.userLogin();
});

app.$logout.click(function(event: JQuery.Event<HTMLFormElement>){
    console.log('logout');
    app.userLogout();
});