const validName = (rule : any,value: string) => {
    if (value.length < 2) {
        return Promise.reject("name must bet at least 2 characters long")
    }
    else {
        return Promise.resolve()
    }
}