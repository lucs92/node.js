class Activity {
    #name;
    #description;
    #dueDate;
    #status;
    #id;

    constructor(activity) {
        this.#name = activity.name;
        this.#description = activity.description;
        this.#dueDate = activity.dueDate;
        this.#status = activity.status;
        this.#id = activity._id.toString();
    }

    get name() {
        return this.#name;
    }   

    get description() {
        return this.#description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get status() {
        return this.#status;
    }

    get id() {
        return this.#id;
    }

    toJSON() {
        return {
            name: this.#name,
            description: this.#description,
            dueDate: this.#dueDate,
            status: this.#status,
            id: this.#id
        }
    }
}

export default Activity;