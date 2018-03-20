import $ from "jquery";
import { Service } from "./Service";
import { Event } from "./Event";
import { Category } from "./Category";

class App
{
    private service: Service;
    private event_list: Array<Event> = [];
    private category_list: Array<Category> = [];

    public user_id: number = -1;

    public $login_form: JQuery<HTMLFormElement>;
    public $login: JQuery<HTMLInputElement>;
    public $pass: JQuery<HTMLInputElement>;
    public $logout: JQuery<HTMLElement>;

    public $event_list: JQuery<HTMLElement>;

    constructor()
	{
        this.service = new Service();
        this.$event_list = $("#event-list") as JQuery<HTMLElement>;
        this.$login_form = $('#login-form') as JQuery<HTMLFormElement>;
        this.$login = $('#login') as JQuery<HTMLInputElement>;
        this.$pass = $('#pass') as JQuery<HTMLInputElement>;
        this.$logout = $('#logout') as JQuery<HTMLElement>;
    }

    public loadFromAPI()
    {
        this.loadCategories();
        this.loadEvents();
        console.log(this.user_id);
    }

    public loadCategories()
    {
        this.service.getCategories((response)=>{
            if(response.success){
                this.registerCategories(response.category_list);
            }else{
                this.category_list = [];
            }
        });
    }
    private registerCategories(json_category_list: Array<{ id: number,label: string }>): void
    {
        for (const json_category of json_category_list)
        {
            const category = new Category(json_category.id,json_category.label);
            this.category_list.push(category);
        }
    }

    public loadEvents()
    {
        this.service.getEvents((response)=>{
            if(response.success){
                this.registerEvents(response.event_list);
                this.showEvents();
            }else{
                this.event_list = [];
            }
        });
    }
    private registerEvents(json_event_list: Array<{ id: number,label: string,date_start: string,date_end: string,position: string,id_category: number }>): void
    {
        for (const json_event of json_event_list)
        {
            const event = new Event(
                json_event.id,
                json_event.label,
                new Date(json_event.date_start + '+01:00'),
                new Date(json_event.date_end + '+01:00'),
                json_event.position,
                json_event.id_category
            );
            this.event_list.push(event);
        }
    }
    public showEvents(): void
    {
        //reset
        this.$event_list.empty();

        //render all events
        for (const event of this.event_list)
        {
            //get category name
            const category_label = this.getCategoryLabel(event.id_category);
            event.render(this.$event_list,category_label);
        }
    }
    public getCategoryLabel(category_id: number)
    {
        const index: number = this.getIndex(this.category_list,category_id);
        return this.category_list[index].label;
    }
    
    public getIndex(list: Array<Category | Event>,id: number): number
    {
        for(const key in list)
        {
            const obj: Category | Event = list[key];
            if(obj.id == id){
                return parseInt(key);
            }
        }
        return 0;
    }

    public userLogin(): boolean
    {
        //On récupère les données du formulaire
        const login: string = this.$login.val() as string;
        const pass: string = this.$pass.val() as string;
        
        //TODO vérifications
        if(login == '' || pass == '')
        {
            return false;
        }

        // Données à envoyer à l'API
        const login_data = {
            login:login,
            pass:pass
        }
        console.log(login_data);
        /* Create */
        this.service.userLogin(
            login_data,
            (data)=>{
                if(data.success){
                    console.log('logged');
                    //Enregistrement de l'id dans app
                    this.user_id = data.id;

                    //mettre à jour l'affichage des events
                    this.showEvents();
                    
                    //Masquer le formulaire
                    this.$login_form.hide();

                }else{
                    alert('login ou mot de passe incorrect');
                }
            }
        );
        return true;
    }

    public userLogout()
    {
        this.service.userLogout(this.user_id,(response)=>{
            if(response.success){
                console.log('logout');
                this.user_id = -1;
            }else{
                alert('erreur');
            }
        });
    }

    public isLogged(): boolean
    {
        if(this.user_id == -1)
        {
            return false;
        }
        
        this.service.isLogged(this.user_id,(response)=>{
            if(response.success){
                return true;
            }else{
                return false;
            }
        });
        return true;
        
    }

}

const app: App = new App;
export { app };