const reg = (input, value) => {
    let expr = {
        id: "^[0-9]+$",
        name: "^[A-Z'][a-zA-Z-' ]+$",
        phone: "^[(][0-9]{3}[)][0-9]{3}-[0-9]{4}",
        email: "^.+@.+[.].+$"
    }
    let reg = expr[input]
    let res = value.match(reg)
    if(res == null) return false
    return true
}

test('Regular expression id', () => {
    expect(reg('id', '123213')).toBe(true)
    expect(reg('id', '123213s')).toBe(false)
    expect(reg('id', 'a123213')).toBe(false)
    expect(reg('id', 'a')).toBe(false)
    expect(reg('id', '123f213')).toBe(false)
    expect(reg('id', '3')).toBe(true)
})


test('Regular expression name', () => {
    expect(reg('name', 'Nikita')).toBe(true)
    expect(reg('name', 'Ku')).toBe(true)
    expect(reg('name', 'Ann42')).toBe(false)
    expect(reg('name', '423Ann')).toBe(false)
    expect(reg('name', 'N1kita')).toBe(false)
    expect(reg('name', '3')).toBe(false)
    expect(reg('name', 'nikita')).toBe(false)
})

test('Regular expression Phone', () => {
    expect(reg('phone', '(234)234-5544')).toBe(true)
    expect(reg('phone', '(999)324-2913')).toBe(true)
    expect(reg('phone', '(9a9)422-5412')).toBe(false)
    expect(reg('phone', '(939)4s2-5412')).toBe(false)
    expect(reg('phone', '(999)422-54a2')).toBe(false)
    expect(reg('phone', '(999422-5412')).toBe(false)
    expect(reg('phone', '9994225412')).toBe(false)
    expect(reg('phone', '(99)9-422-5412')).toBe(false)
    expect(reg('phone', '(a999422-5412')).toBe(false)
    expect(reg('phone', '[999]422-5412')).toBe(false)
    expect(reg('phone', '(99)9-422-5412')).toBe(false)
})

test('Regular expression email', () => {
    expect(reg('email', 'ssdf@gmail.com')).toBe(true)
    expect(reg('email', 'a@gg.ru')).toBe(true)
    expect(reg('email', 'Ann42')).toBe(false)
    expect(reg('email', '4232')).toBe(false)
    expect(reg('email', '')).toBe(false)
    expect(reg('email', 'sdf@dsfsdf')).toBe(false)
})
