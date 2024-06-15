export const validate = (payload, setInvalidFields) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            invalids++
            setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Không được để trống!' }])
        }
    }
    for (let arr of formatPayload) {
        switch (arr[0]) {
            case 'phoneNumber':
                const regex = /(03|05|07|08|09)+([0-9]{8})\b/
                if (!regex.test(arr[1])) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Số điện thoại không hợp lệ!' }])
                }
                break;
            case 'password':
                const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
                if (!arr[1].match(regexPass)) {
                    invalids++
                    setInvalidFields(prev => [...prev, {
                        name: arr[0], mes: '- Mật khẩu phải có ít nhất 8 ký tự.\n' +
                            '- Chứa ít nhất một chữ thường.\n' +
                            '- Một chữ cái viết hoa.\n' +
                            '- Một chữ số.\n' +
                            '- Một ký tự đặc biệt.'
                    }])
                }
                break;
            case 'confirmPassword':
                if (arr[1] !== payload.password) {
                    invalids++;
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Mật khẩu không tương ứng!' }]);
                }
                break;
            case 'birthday':
                const age = getAge(arr[1]);

                if (age < 18 || age > 55) {
                    invalids++;
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Tuổi không hợp lệ!' }]);
                }
                break;
            case 'email':
                const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                if (!emailRegex.test(arr[1])) {
                    invalids++;
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Email không hợp lệ!' }]);
                }
                break;
            default:
                break;
        }
    }

    return invalids;
}

function getAge(birthDateString) {
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}