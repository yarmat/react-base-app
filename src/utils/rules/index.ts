export const required = (message: string = 'This field is required.') => {
    return { required: true, message: message  };
}

export const confirmed = (confirmValue: string, message: string = 'This field is not confirmed.') => () => ({
    validator(_: any, value: string) {
        if(confirmValue === value) {
            return Promise.resolve();
        }

        return Promise.reject(message);
    }
})
