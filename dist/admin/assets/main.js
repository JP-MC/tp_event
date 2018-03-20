System.register("class/Service", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var API_URL, Service;
    return {
        setters: [],
        execute: function () {
            API_URL = 'http://localhost/webservice_tp/api/';
            Service = class Service {
                formatDateToSQL(date, time) {
                    return date + 'T' + time + ':00';
                }
                getEvents(callback) {
                    $.ajax({
                        url: API_URL + 'event/',
                        method: "GET",
                        dataType: "json",
                        success: callback,
                        error: function (err) {
                            console.log('ERREUR');
                            console.log(err);
                        }
                    });
                }
                createEvent(data, callback) {
                    $.ajax({
                        url: API_URL + 'event/',
                        method: "POST",
                        dataType: "json",
                        data: data,
                        success: callback,
                        error: function (err) {
                            console.log('ERREUR');
                            console.log(err);
                        }
                    });
                }
                updateEvent(id, data, callback) {
                    $.ajax({
                        url: API_URL + 'event/' + id,
                        method: "PUT",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        success: callback,
                        error: function (err) {
                            console.log('ERREUR');
                            console.log(err);
                        }
                    });
                }
                deleteEvent(id, callback) {
                    $.ajax({
                        url: API_URL + 'event/' + id,
                        method: "DELETE",
                        success: callback,
                        error: function (err) {
                            console.log('ERREUR');
                            console.log(err);
                        }
                    });
                }
                getCategories(callback) {
                    $.ajax({
                        url: API_URL + 'category/',
                        method: "GET",
                        dataType: "json",
                        success: callback,
                        error: function (err) {
                            console.log('ERREUR');
                            console.log(err);
                        }
                    });
                }
            };
            exports_1("Service", Service);
        }
    };
});
System.register("class/FormatDate", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var FormatDate, formatDate;
    return {
        setters: [],
        execute: function () {
            FormatDate = class FormatDate {
                readableDateTime(date) {
                    const date_options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const hours = date.getHours().toString();
                    const minutes = this.formatTime(date.getMinutes());
                    return date.toLocaleDateString('fr-FR', date_options) + ' à ' + hours + 'h' + minutes;
                }
                inputTime(date) {
                    const hours = this.formatTime(date.getHours());
                    const minutes = this.formatTime(date.getMinutes());
                    return hours + ':' + minutes;
                }
                inputDate(date) {
                    const year = date.getFullYear().toString();
                    const month = this.formatTime(date.getMonth() + 1);
                    const day = this.formatTime(date.getDate());
                    return year + '-' + month + '-' + day;
                }
                formatTime(time) {
                    let time_str = time.toString();
                    time_str = (time_str.length == 1) ? '0' + time_str : time_str;
                    return time_str;
                }
            };
            formatDate = new FormatDate;
            exports_2("formatDate", formatDate);
        }
    };
});
System.register("class/Event", ["class/FormatDate"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var FormatDate_1, Event;
    return {
        setters: [
            function (FormatDate_1_1) {
                FormatDate_1 = FormatDate_1_1;
            }
        ],
        execute: function () {
            Event = class Event {
                constructor(id, label, date_start, date_end, position, id_category) {
                    this.id = id;
                    this.label = label;
                    this.date_start = date_start;
                    this.date_end = date_end;
                    this.position = position;
                    this.id_category = id_category;
                }
                render($parent, category_label) {
                    let html = '<div class="event" data-id="' + this.id + '">';
                    html += '<header>';
                    html += '<div class="id-category">' + category_label + '</div>';
                    html += '<h4 class="label">' + this.label + '</h4>';
                    html += '<div class="edit"></div>';
                    html += '<div class="delete"></div>';
                    html += '</header>';
                    html += '<div class="event-wrap">';
                    html += '<p class="position">Lieu : ' + this.position + '</p>';
                    html += '<p class="date-start">Début : ' + FormatDate_1.formatDate.readableDateTime(this.date_start) + '</p>';
                    html += '<p class="date-end">Fin : ' + FormatDate_1.formatDate.readableDateTime(this.date_end) + '</p>';
                    html += '</div>';
                    html += '</div>';
                    this.$dom = $(html);
                    $parent.append(this.$dom);
                }
                remove() {
                    this.$dom.remove();
                }
                getDateStart() {
                    return FormatDate_1.formatDate.inputDate(this.date_start);
                }
                getDateEnd() {
                    return FormatDate_1.formatDate.inputDate(this.date_end);
                }
                getTimeStart() {
                    return FormatDate_1.formatDate.inputTime(this.date_start);
                }
                getTimeEnd() {
                    return FormatDate_1.formatDate.inputTime(this.date_end);
                }
            };
            exports_3("Event", Event);
        }
    };
});
System.register("class/Category", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Category;
    return {
        setters: [],
        execute: function () {
            Category = class Category {
                constructor(id, label) {
                    this.id = id;
                    this.label = label;
                }
                getHtml() {
                    return '<option value="' + this.id + '">' + this.label + '</option>';
                }
            };
            exports_4("Category", Category);
        }
    };
});
System.register("class/App", ["jquery", "class/Service", "class/Event", "class/Category"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var jquery_1, Service_1, Event_1, Category_1, App, app;
    return {
        setters: [
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (Service_1_1) {
                Service_1 = Service_1_1;
            },
            function (Event_1_1) {
                Event_1 = Event_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
                    this.event_list = [];
                    this.category_list = [];
                    this.edit_event_id = -1;
                    this.service = new Service_1.Service();
                    this.$event_form = jquery_1.default('#event-form');
                    this.$label = jquery_1.default('#label');
                    this.$date_start = jquery_1.default('#date-start');
                    this.$time_start = jquery_1.default('#time-start');
                    this.$date_end = jquery_1.default('#date-end');
                    this.$time_end = jquery_1.default('#time-end');
                    this.$position = jquery_1.default('#position');
                    this.$category = jquery_1.default("#category");
                    this.$event_list = jquery_1.default("#event-list");
                }
                loadFromAPI() {
                    this.loadCategories();
                    this.loadEvents();
                }
                loadCategories() {
                    this.service.getCategories((response) => {
                        if (response.success) {
                            this.registerCategories(response.category_list);
                            this.showCategories();
                        }
                        else {
                            this.category_list = [];
                        }
                    });
                }
                registerCategories(json_category_list) {
                    for (const json_category of json_category_list) {
                        const category = new Category_1.Category(json_category.id, json_category.label);
                        this.category_list.push(category);
                    }
                }
                showCategories() {
                    let html = '';
                    for (const category of this.category_list) {
                        html += category.getHtml();
                    }
                    this.$category.html(html);
                }
                loadEvents() {
                    this.service.getEvents((response) => {
                        if (response.success) {
                            this.registerEvents(response.event_list);
                            this.showEvents();
                        }
                        else {
                            this.event_list = [];
                        }
                    });
                }
                registerEvents(json_event_list) {
                    for (const json_event of json_event_list) {
                        const event = new Event_1.Event(json_event.id, json_event.label, new Date(json_event.date_start + '+01:00'), new Date(json_event.date_end + '+01:00'), json_event.position, json_event.id_category);
                        this.event_list.push(event);
                    }
                }
                showEvents() {
                    this.$event_list.empty();
                    for (const event of this.event_list) {
                        const category_label = this.getCategoryLabel(event.id_category);
                        event.render(this.$event_list, category_label);
                    }
                }
                getCategoryLabel(category_id) {
                    const index = this.getIndex(this.category_list, category_id);
                    return this.category_list[index].label;
                }
                submitEvent() {
                    const label = this.$label.val();
                    const position = this.$position.val();
                    if (label == '' || position == '') {
                        return false;
                    }
                    const date_start_val = this.$date_start.val();
                    const time_start_val = this.$time_start.val();
                    const date_start = this.service.formatDateToSQL(date_start_val, time_start_val);
                    const date_end_val = this.$date_end.val();
                    const time_end_val = this.$time_end.val();
                    const date_end = this.service.formatDateToSQL(date_end_val, time_end_val);
                    const id_category = this.$category.val();
                    const submit_data = {
                        label: label,
                        date_start: date_start,
                        date_end: date_end,
                        position: position,
                        id_category: id_category
                    };
                    if (this.edit_event_id == -1) {
                        console.log('create');
                        this.service.createEvent(submit_data, (data) => {
                            if (data.success) {
                                const event = new Event_1.Event(data.id, label, new Date(date_start), new Date(date_end), position, id_category);
                                this.event_list.push(event);
                                this.showEvents();
                                this.resetForm();
                            }
                            else {
                                alert('erreur');
                            }
                        });
                    }
                    else {
                        console.log('update');
                        this.service.updateEvent(this.edit_event_id, submit_data, (data) => {
                            if (data.success) {
                                const index = this.getIndex(this.event_list, this.edit_event_id);
                                const event = this.event_list[index];
                                event.label = label;
                                event.date_start = new Date(date_start);
                                event.date_end = new Date(date_end);
                                event.position = position;
                                event.id_category = id_category;
                                this.showEvents();
                                this.resetForm();
                            }
                            else {
                                alert('erreur');
                            }
                        });
                    }
                    return true;
                }
                removeEvent(id) {
                    this.service.deleteEvent(id, (data) => {
                        if (data.success) {
                            const index = this.getIndex(this.event_list, id);
                            this.event_list[index].remove();
                            this.event_list.splice(index, 1);
                        }
                        else {
                            alert('erreur');
                        }
                    });
                }
                editEvent(id) {
                    const event = this.event_list[this.getIndex(this.event_list, id)];
                    this.$label.val(event.label);
                    this.$date_start.val(event.getDateStart());
                    this.$time_start.val(event.getTimeStart());
                    this.$date_end.val(event.getDateEnd());
                    this.$time_end.val(event.getTimeEnd());
                    this.$position.val(event.position);
                    this.$category.find('option[value=\'' + event.id_category + '\']').prop('selected', true);
                    this.edit_event_id = id;
                }
                resetForm() {
                    const event_form = document.getElementById('event-form');
                    event_form.reset();
                    this.edit_event_id = -1;
                }
                getIndex(list, id) {
                    for (const key in list) {
                        const obj = list[key];
                        if (obj.id == id) {
                            return parseInt(key);
                        }
                    }
                    return 0;
                }
            };
            app = new App;
            exports_5("app", app);
        }
    };
});
System.register("main", ["jquery", "class/App"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var jquery_2, App_1;
    return {
        setters: [
            function (jquery_2_1) {
                jquery_2 = jquery_2_1;
            },
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            console.log("Version: " + jquery_2.default.fn.jquery);
            App_1.app.loadFromAPI();
            App_1.app.$event_form.submit(function (event) {
                console.log('submit');
                event.preventDefault();
                App_1.app.submitEvent();
            });
            App_1.app.$event_list.on('click', '.delete', function () {
                console.log('delete');
                const id_event = parseInt(jquery_2.default(this).parent().parent().data('id'));
                App_1.app.removeEvent(id_event);
            });
            App_1.app.$event_list.on('click', '.edit', function () {
                console.log('edit');
                const id_event = parseInt(jquery_2.default(this).parent().parent().data('id'));
                App_1.app.editEvent(id_event);
            });
        }
    };
});
//# sourceMappingURL=main.js.map