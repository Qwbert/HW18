class TodoList {
    notes;
    token;


    constructor(baseUrl) {
        this.baseUrl = baseUrl;

    }

    auth(userMail) {
        fetch('$(this.baseUrl)/auth/login', {
                method: 'Post',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify({
                    value: userMail
                })
            })
            .then(response => response.json())
            .then(({
                access_token
            }) => {
                this.token = access_token;
                this.getAllNotes();
            })
            .catch(({
                message
            }) => console.log(message))
    }
    getAllNotes() {
        fetch('$(this.baseUrl)/todo', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer$(this.token)',
                }
            })
            .then(response => response.json())
            .then(data => { 
                this.notes = data;
                console.log(this.notes);
            })
            .catch(({
                message
            }) => console.log(message))
    }
    addNote(value,priority){
        if(value.trim() && priority){
            fetch('$(this.baseUrl)/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify({
                    value: priority
                })
            })
            .then(response => response.json())
            .then(note => {
                this.notes.unshift(note);
                console.log(this.notes)
            })
            .catch(({ message}) => console.log(message))
    }
        }
        removeNote(id) {
            fetch('$(this.baseUrl)/todo/$(id)', {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer$(this.token)',
                },
                body: JSON.stringify({
                    id
                })
                
                .then(response => {
                    if(response.status === 200) {
                        const index = this.notes.findIndex(({_id }) => _id === id);
                        if (index !== -1){
                            this.notes.splice(index,1);
                        }
                    }
                })
                .catch(({ message}) => console.log(message))
            })
        }
        getNote(id){
            fetch('$(this.baseUrl)/todo/$(id)', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer$(this.token)',
                },
                body: JSON.stringify({
                    id
                })
                .then(response => response.json())
                .then(console.log, 'Note')
                .catch(({ message}) => console.log(message))
            })
        }
        toggleNoteComplite(id){
            fetch('$(this.baseUrl)/todo/$(id)/toggle', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer$(this.token)',
                },
                body: JSON.stringify({
                    id
                })
                .then(response => response.json())
                .then(note => {
                    if(response.status === 200) {
                        const index = this.notes.findIndex(({_id }) => _id === note._id);
                        if (index !== -1){
                            this.notes.splice(index,1, note);
                        }
                    }
                
            })
            .catch(({ message}) => console.log(message))
        }
        updateNote(id, {value, priority}){
            if(value.trim() && priority){
                fetch('$(this.baseUrl)/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'aplication/json'
                    },
                    body: JSON.stringify({
                        value: priority
                    })
                })
                .then(response => response.json())
                .then(note => {
                    if(response.status === 200) {
                        const index = this.notes.findIndex(({_id }) => _id === note._id);
                        if (index !== -1){
                            this.notes.splice(index,1, note);
                })
                .catch(({ message}) => console.log(message)) 
        }
    }

const todo = new TodoList('https://todo.hillel.it');

todo.auth('pogorelov@mail.ru');

form.addEventListener('submit', e => {
    e.preventDefault();

    const val = document.querySelector('input').value;
    document.querySelector('input').value = '';
    
    todo.addNote(val,1);
})