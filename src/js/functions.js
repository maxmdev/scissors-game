export const div = (className) => {
    if (className) {
        const div = document.createElement('div');
        div.classList.add(className);
        return div;
    } else {
        return document.createElement('div');
    }
}

export const heroesMarkup = () => {
    const heroLeft = div('hero_left'), heroRight = div('hero_right'), heroes = div();
    heroes.append(heroLeft, heroRight);
    return heroes;
}

export const selectWeapon = (selectedWeapon, target) => {
    if (selectedWeapon && selectedWeapon !== target) {
        selectedWeapon.classList.remove('selected');
        target.classList.add('selected');
        selectedWeapon = target
        return selectedWeapon;
    }

    if (selectedWeapon === target) {
        target.classList.remove('selected');
        selectedWeapon = null
        return selectedWeapon;
    } else {
        target.classList.add('selected');
        selectedWeapon = target
        return selectedWeapon;
    }
};

export const createButton = (text) => {
    const button = document.createElement('button');
    button.innerText = text;
    button.classList.add('button'+text+'');
    return button;
}