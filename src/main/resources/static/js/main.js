function getIndex(list, id) {
    for (var i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}

var ticketApi = Vue.resource('/ticket{/id}');

Vue.component('ticket-form', {
    props: ['tickets', 'ticketAttr'],
    data: function() {
        return {
            ticketName: '',
            ticketDescription: '',
            id: ''
        }
    },
    watch: {
        ticketAttr: function(newVal, oldVal) {
            this.ticketName = newVal.ticketName;
            this.ticketDescription = new newVal.ticketDescription;
            this.id = newVal.id;
        }
    },
    template:
        '<div>' +
        '<input type="ticketName" placeholder="Write something" v-model="ticketName" />' +
        '<input type="ticketDescription" placeholder="Write something" v-model="ticketDescription" />' +
        '<input type="button" value="Save" @click="save" />' +
        '</div>',
    methods: {
        save: function() {
            var ticket = { ticketName: this.ticketName, ticketDescription: this.ticketDescription };

            if (this.id) {
                ticketApi.update({id: this.id}, ticket).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.tickets, data.id);
                        this.tickets.splice(index, 1, data);
                        this.ticketName = ''
                        this.ticketDescription = ''
                        this.id = ''
                    })
                )
            } else {
                ticketApi.save({}, ticket).then(result =>
                    result.json().then(data => {
                        this.tickets.push(data);
                        this.ticketName = ''
                        this.ticketDescription = ''
                    })
                )
            }
        }
    }
});

Vue.component('ticket-row', {
    props: ['ticket', 'editMethod', 'tickets'],
    template: '<div>' +
        '<i>({{ ticket.id }})</i> {{ ticket.ticketName }}' +
        '<span style="position: absolute; right: 0">' +
        '<input type="button" value="Edit" @click="edit" />' +
        '<input type="button" value="X" @click="del" />' +
        '</span>' +
        '</div>',
    methods: {
        edit: function() {
            this.editMethod(this.ticket);
        },
        del: function() {
            ticketApi.remove({id: this.ticket.id}).then(result => {
                if (result.ok) {
                    this.tickets.splice(this.tickets.indexOf(this.ticket), 1)
                }
            })
        }
    }
});

Vue.component('tickets-list', {
    props: ['tickets'],
    data: function() {
        return {
            ticket: null
        }
    },
    template:
        '<div style="position: relative; width: 300px;">' +
        '<ticket-form :tickets="tickets" :ticketAttr="ticket" />' +
        '<ticket-row v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" ' +
        ':editMethod="editMethod" :tickets="tickets" />' +
        '</div>',
    created: function() {
        ticketApi.get().then(result =>
            result.json().then(data =>
                data.forEach(ticket => this.tickets.push(ticket))
            )
        )
    },
    methods: {
        editMethod: function(ticket) {
            this.ticket = ticket;
        }
    }
});

var app = new Vue({
    el: '#app',
    template: '<tickets-list :tickets="tickets" />',
    data: {
        tickets: []
    }
});