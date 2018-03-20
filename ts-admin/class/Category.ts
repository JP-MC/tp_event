export class Category
{
    public id: number;
    public label: string;

	constructor(id: number,label: string)
	{
		this.id = id;
        this.label = label;
    }

    public getHtml(): string
    {
        return '<option value="' + this.id + '">' + this.label + '</option>';
    }
}