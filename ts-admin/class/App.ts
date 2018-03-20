import $ from "jquery";
import { Service } from "./Service";
import { Event } from "./Event";
import { Category } from "./Category";

class App
{
    private service: Service;
    private event_list: Array<Event> = [];
    private category_list: Array<Category> = [];

    public edit_event_id: number = -1;

    public $event_form: JQuery<HTMLFormElement>;
    public $label: JQuery<HTMLInputElement>;
    public $date_start: JQuery<HTMLInputElement>;
    public $time_start: JQuery<HTMLInputElement>;
    public $date_end: JQuery<HTMLInputElement>;
    public $time_end: JQuery<HTMLInputElement>;
    public $position: JQuery<HTMLInputElement>;
    public $category: JQuery<HTMLSelectElement>;

    public $event_list: JQuery<HTMLElement>;

    constructor()
	{
        this.service = new Service();

        this.$event_form = $('#event-form') as JQuery<HTMLFormElement>;
        this.$label = $('#label') as JQuery<HTMLInputElement>;
        this.$date_start = $('#date-start') as JQuery<HTMLInputElement>;
        this.$time_start = $('#time-start') as JQuery<HTMLInputElement>;
        this.$date_end = $('#date-end') as JQuery<HTMLInputElement>;
        this.$time_end = $('#time-end') as JQuery<HTMLInputElement>;
        this.$position = $('#position') as JQuery<HTMLInputElement>;
        this.$category = $("#category") as JQuery<HTMLSelectElement>;
        
        this.$event_list = $("#event-list") as JQuery<HTMLElement>;
    }

    public loadFromAPI()
    {
        this.loadCategories();
        this.loadEvents();
    }

    public loadCategories()
    {
        this.service.getCategories((response)=>{
            if(response.success){
                this.registerCategories(response.category_list);
                this.showCategories();
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
    public showCategories(): void
    {
        let html: string = '';
        for (const category of this.category_list)
        {
            html += category.getHtml();
        }
        this.$category.html(html);
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
    
    public submitEvent(): boolean
    {
        //On récupère les données du formulaire
        const label: string = this.$label.val() as string;
        const position: string = this.$position.val() as string;
        
        //TODO vérifications
        if(label == '' || position == '')
        {
            return false;
        }

        const date_start_val: string = this.$date_start.val() as string;
        const time_start_val: string = this.$time_start.val() as string;

        const date_start: string =  this.service.formatDateToSQL(date_start_val,time_start_val);

        const date_end_val: string = this.$date_end.val() as string;
        const time_end_val: string = this.$time_end.val() as string;

        const date_end: string = this.service.formatDateToSQL(date_end_val,time_end_val);
        
        const id_category = this.$category.val() as number;

        // Données à envoyer à l'API
        const submit_data = {
            label:label,
            date_start:date_start,
            date_end:date_end,
            position:position,
            id_category:id_category
        }

        if(this.edit_event_id == -1)
        {
            /* Create */
            console.log('create');
            this.service.createEvent(
                submit_data,
                (data)=>{
                    if(data.success){
                        //Create event
                        const event: Event = new Event(
                            data.id,
                            label,
                            new Date(date_start),
                            new Date(date_end),
                            position,
                            id_category
                        );
                        
                        // add in app list
                        this.event_list.push(event);
                       
                        //mettre à jour l'affichage des events
                        this.showEvents();
                        
                        //vider le formulaire
                        this.resetForm();
                    }else{
                        alert('erreur');
                    }
                }
            );
        }
        else
        {
            /* Edit */
            console.log('update');
            this.service.updateEvent(
                this.edit_event_id,
                submit_data,
                (data)=>{
                    if(data.success){
                        //update event in app list
                        const index: number = this.getIndex(this.event_list,this.edit_event_id);
                        const event: Event = this.event_list[index];
                        event.label = label;
                        event.date_start = new Date(date_start);
                        event.date_end = new Date(date_end);
                        event.position = position;
                        event.id_category = id_category;
                        
                        //mettre à jour l'affichage des events
                        this.showEvents();
                        
                        //vider le formulaire et remettre le flag à false
                        this.resetForm();
                    }else{
                        alert('erreur');
                    }
                }
            );
            
        }
        return true;
    }

    public removeEvent(id: number): void
    {
        this.service.deleteEvent(
            id,
            (data)=>{
                if(data.success){
                    const index = this.getIndex(this.event_list,id);
                    //remove from dom
                    this.event_list[index].remove();
                    //remove in app list
                    this.event_list.splice(index,1);
                }else{
                    alert('erreur');
                }
            }
        );
    }

    public editEvent(id: number): void
    {
        //fill the form with event data
        const event = this.event_list[this.getIndex(this.event_list,id)];
        this.$label.val(event.label);
        this.$date_start.val(event.getDateStart());
        this.$time_start.val(event.getTimeStart());
        this.$date_end.val(event.getDateEnd());
        this.$time_end.val(event.getTimeEnd());
        this.$position.val(event.position);
        this.$category.find('option[value=\'' + event.id_category + '\']').prop('selected', true);
       
        //Set a flag to update
        this.edit_event_id = id;
    }

    resetForm()
    {
        //Reset du formulaire : Pas de .reset() en jquery et pas possible de convertir jQuery<HTMLFormElement> en HTMLFormElement
        const event_form: HTMLFormElement = document.getElementById('event-form') as HTMLFormElement;
        event_form.reset();
        this.edit_event_id = -1;
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
}

const app: App = new App;
export { app };