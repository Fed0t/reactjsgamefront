export const selectUser = (user) => {
    console.log('You click the user:', user.first);
    return {
        type: 'USER_SELECTED',
        payload: user
    }
};
