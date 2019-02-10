//resource from service which provides us needed data on given this path
var mesApi = Vue.resource('/messages{/id}');

Vue.component('mes-row', {
    props: ['message'],
    template: '<div>{{ message.id }} {{ message.text }}</div>'
});

Vue.component('messages-list', {
    props: ['messages'],
    template:
    '<div>' +
    '<mes-row v-for="message in messages" :key="message.id" :message="message"/>' +
    '</div>',
    created: function () {
        mesApi.get().then(result =>
            result.json().then(data =>
                data.forEach(message => this.messages.push(message))
            )
        )
    }
});

var app = new Vue({
    el: '#messageId',
    template: '<messages-list :messages="messages" />',
    data: {
        messages: []
    }
});
