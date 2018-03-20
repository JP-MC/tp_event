import { formatDate } from "./FormatDate";

export class Event
{
    public id: number;
    public label: string;
    public date_start: Date;
    public date_end: Date;
    public position: string;
    public id_category: number;

    public $dom: JQuery<HTMLElement>;

	constructor(id: number,label: string,date_start: Date,date_end: Date,position: string,id_category: number)
	{
		this.id = id;
        this.label = label;
        this.date_start = date_start;
        this.date_end = date_end;
        this.position = position;
        this.id_category = id_category;
    }

    public render($parent: JQuery<HTMLElement>,category_label: string): void
    {
        let html: string = '<div class="event" data-id="' + this.id + '">';
        html += '<header>';
        html += '<div class="id-category">' + category_label + '</div>';
        html += '<h4 class="label">' + this.label + '</h4>';
        html += '<div class="edit"></div>';
        html += '<div class="delete"></div>';
        html += '</header>';
        html += '<div class="event-wrap">';
        html += '<p class="position">Lieu : ' + this.position + '</p>';
        html += '<p class="date-start">Début : ' + formatDate.readableDateTime(this.date_start) + '</p>';
        html += '<p class="date-end">Fin : ' + formatDate.readableDateTime(this.date_end) + '</p>';
        html += '</div>';
        html += '</div>';

        this.$dom = $(html);
        $parent.append(this.$dom);
    }

    public remove()
    {
        this.$dom.remove();
    }

    public getDateStart(): string
    {
        return formatDate.inputDate(this.date_start);
    }
    public getDateEnd(): string
    {
        return formatDate.inputDate(this.date_end);
    }
    public getTimeStart(): string
    {
        return formatDate.inputTime(this.date_start);
    }
    public getTimeEnd(): string
    {
        return formatDate.inputTime(this.date_end);
    }
}