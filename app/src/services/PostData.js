export function PostData(data) {
    // change this with the fetch to the API to retrieve tokens
    return new Promise((resolve, reject) => {
        if(data.username === 'martina' && data.password === 'example') {
            resolve({
                'user_id': 1,
                'name': 'Martina',
                'token': 'hjnazhjdsajhgsfjhgsfjhfgjyuguyegfsuyg'
            })
            return;
        }
        reject("username and passoword don't match")
    })
}