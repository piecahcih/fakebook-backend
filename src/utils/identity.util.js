export default function identityKeyCheck (identity) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10,15}$/

    let identityKey = ''
    if (emailRegex.test(identity)) {
    identityKey = 'email'
    }
    if (mobileRegex.test(identity)) {
    identityKey = 'mobile'
    }
    return identityKey
}

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const mobileRegex = /^[0-9]{10,15}$/

    // console.log(emailRegex.test('andy@gmail.com'))
    // console.log(mobileRegex.test('1234567890'))