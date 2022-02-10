export const required = (message: string = 'This field is required.') => {
    return { required: true, message: message  };
}

