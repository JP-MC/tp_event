class FormatDate
{
	public readableDateTime(date: Date): string
    {
        const date_options: Object = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		const hours: string = date.getHours().toString();
		const minutes: string = this.formatTime(date.getMinutes());
        return date.toLocaleDateString('fr-FR',date_options) + ' à ' + hours + 'h' + minutes;
    }
    public inputTime(date: Date): string
    {
        const hours: string = this.formatTime(date.getHours());
        const minutes: string = this.formatTime(date.getMinutes());
        return hours + ':' + minutes;
    }
    public inputDate(date: Date): string
    {
        const year: string = date.getFullYear().toString();
        const month: string = this.formatTime(date.getMonth() + 1);
        const day: string = this.formatTime(date.getDate());
        return year + '-' + month + '-' + day;
    }
    private formatTime(time: number): string
    {
        let time_str: string = time.toString();
        time_str = (time_str.length == 1) ? '0' + time_str : time_str;
        return time_str;
    }
}

const formatDate: FormatDate = new FormatDate;
export { formatDate };